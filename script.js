        let users = [];
        let currentUser = null;
        let cart = [];

        // Toggle Cart
        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            sidebar.classList.toggle('open');
        }

        // Scroll to Top Function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/Hide Back to Top Button
        window.addEventListener('scroll', function() {
            const backToTop = document.getElementById('backToTop');
            const hero = document.querySelector('.hero');
            
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Parallax effect on hero
            if (hero) {
                const scrolled = window.pageYOffset;
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });

        // Add to Cart
        function addToCart(name, price, image) {
            if (!currentUser) {
                showNotification('Faça login para adicionar produtos ao carrinho! 🔒', 'error');
                showLogin();
                return;
            }

            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            updateCart();
            showNotification(`${name} adicionado ao carrinho! 🛒`, 'success');
            pulseCart();
        }

        // Remove from Cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Item removido do carrinho! 🗑️', 'success');
        }

        // Update Cart Display
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotal = document.getElementById('cart-total');
            const checkoutBtn = document.getElementById('checkout-btn');

            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-ghost"></i>
                        <p>Seu carrinho está vazio</p>
                    </div>
                `;
                cartCount.textContent = '0';
                cartTotal.textContent = 'R$ 0';
                checkoutBtn.disabled = true;
                return;
            }

            let total = 0;
            let totalItems = 0;

            cartItems.innerHTML = cart.map((item, index) => {
                total += item.price * item.quantity;
                totalItems += item.quantity;
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">R$ ${item.price} x ${item.quantity}</div>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');

            cartCount.textContent = totalItems;
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
            checkoutBtn.disabled = false;
        }

        // Pulse Cart Icon
        function pulseCart() {
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.animation = 'none';
            setTimeout(() => {
                cartIcon.style.animation = 'float 3s ease-in-out infinite, shake 0.5s ease';
            }, 10);
        }

        // Checkout
        function checkout() {
            if (!currentUser) {
                showNotification('Faça login para finalizar a compra! 🔒', 'error');
                toggleCart();
                showLogin();
                return;
            }

            if (cart.length === 0) {
                showNotification('Seu carrinho está vazio! 👻', 'error');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            showNotification(`Compra finalizada! Total: R$ ${total.toFixed(2)} 💀🖤`, 'success');
            
            setTimeout(() => {
                cart = [];
                updateCart();
                toggleCart();
                showNotification('Obrigado pela sua compra! Em breve você receberá a confirmação. 📦', 'success');
            }, 2000);
        }

        // Category Filter
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const category = this.dataset.category;
                const products = document.querySelectorAll('.product-card');

                products.forEach(product => {
                    if (category === 'all' || product.dataset.category === category) {
                        product.style.display = 'block';
                        setTimeout(() => {
                            product.style.opacity = '1';
                            product.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        product.style.opacity = '0';
                        product.style.transform = 'translateY(50px)';
                        setTimeout(() => {
                            product.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        function showLogin() {
            document.getElementById('login-container').style.display = 'flex';
        }

        function showRegister() {
            document.getElementById('register-container').style.display = 'flex';
        }

        function closeAuth() {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('register-container').style.display = 'none';
        }

        function login(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                showUserInterface();
                closeAuth();
                showNotification('Login realizado com sucesso! Bem-vindo(a), ' + user.name + '! 🖤', 'success');
            } else {
                showNotification('Email ou senha incorretos! ☠', 'error');
            }
        }

        function register(event) {
            event.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // Validação simples do formulário
            if (name.length < 3) {
                showNotification('Nome deve ter pelo menos 3 caracteres! ⚠', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showNotification('Email inválido! ⚠', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Senha deve ter pelo menos 6 caracteres! ⚠', 'error');
                return;
            }

            if (users.find(u => u.email === email)) {
                showNotification('Email já cadastrado! ⚠', 'error');
                return;
            }

            const newUser = { id: Date.now(), name, email, password };
            users.push(newUser);
            currentUser = newUser;
            
            showUserInterface();
            closeAuth();
            showNotification('Cadastro realizado com sucesso! Bem-vindo(a), ' + name + '! 🖤', 'success');
            
            // Limpar formulário
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
        }

        function logout() {
            currentUser = null;
            cart = [];
            updateCart();
            showGuestInterface();
            showNotification('Logout realizado com sucesso! 👋', 'success');
        }

        function showUserInterface() {
            document.getElementById('auth-buttons').style.display = 'none';
            document.getElementById('user-menu').style.display = 'flex';
            document.getElementById('user-name').textContent = currentUser.name;
            document.getElementById('dashboard').style.display = 'block';
        }

        function showGuestInterface() {
            document.getElementById('auth-buttons').style.display = 'flex';
            document.getElementById('user-menu').style.display = 'none';
            document.getElementById('dashboard').style.display = 'none';
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1.2rem 2rem;
                background: ${type === 'success' ? '#ff0033' : '#000'};
                color: #fff;
                border: 2px solid ${type === 'success' ? '#fff' : '#ff0033'};
                z-index: 3000;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                animation: slideIn 0.3s ease;
                box-shadow: 0 5px 20px rgba(255, 0, 51, 0.5);
                max-width: 350px;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3500);
        }

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAuth();
                const sidebar = document.getElementById('cart-sidebar');
                if (sidebar.classList.contains('open')) {
                    toggleCart();
                }
            }
            // Atalho para abrir carrinho (Ctrl + K)
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                toggleCart();
            }
        });

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
            }
        `;
        document.head.appendChild(style);

        // Parallax effect on hero
        window.addEventListener('scroll', function() {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            if (hero) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });

        // Product card animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });

        // Add glitch effect on logo
        const logo = document.querySelector('.logo');
        setInterval(() => {
            logo.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px 4px rgba(255, 0, 51, 0.5),
                ${Math.random() * -5}px ${Math.random() * 5}px 4px rgba(0, 255, 255, 0.3)
            `;
            setTimeout(() => {
                logo.style.textShadow = '2px 2px 4px rgba(255, 0, 51, 0.5)';
            }, 100);
        }, 3000);

        // Discount banner animation
        const discountItems = document.querySelectorAll('.discount-item');
        discountItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 200);
        });

        // Product badge animations
        document.querySelectorAll('.product-badge').forEach(badge => {
            setInterval(() => {
                badge.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }, 4000 + Math.random() * 2000);
        });

        // Loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
                function showPasswordRecovery(event) {
            if (event) event.preventDefault();
            closeAuth();
            document.getElementById('recovery-container').style.display = 'flex';
        }

        function closeAuth() {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('recovery-container').style.display = 'none';
        }

        function recoverPassword(event) {
            event.preventDefault();
            const email = document.getElementById('recovery-email').value;

            // Verifica se o email existe
            const user = users.find(u => u.email === email);

            if (user) {
                showNotification(`Email de recuperação enviado para ${email}! Verifique sua caixa de entrada. 📧`, 'success');
                setTimeout(() => {
                    closeAuth();
                    document.getElementById('recovery-email').value = '';
                }, 2000);
            } else {
                showNotification('Email não encontrado em nossa base de dados! ⚠', 'error');
            }
        }

                    // Gera um código de recuperação temporário
            const recoveryCode = Math.random().toString(36).substring(2, 10).toUpperCase();
            
            // Armazena o código temporariamente (em um cenário real, isso seria no servidor)
            user.recoveryCode = recoveryCode;
            user.recoveryExpires = Date.now() + (15 * 60 * 1000); // Expira em 15 minutos

            // Parâmetros para o template de email
            const templateParams = {
                to_email: email,
                to_name: user.name,
                recovery_code: recoveryCode,
                user_name: user.name,
                store_name: 'Paroxetina Gothic Store'
            };

            // Envia o email via EmailJS
            emailjs.send('service_8i1u8jp', 'template_zmhld5q', templateParams)
                .then(function(response) {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    showNotification(`✅ Email enviado para ${email}! Verifique sua caixa de entrada (e spam). 📧`, 'success');
                    
                    setTimeout(() => {
                        closeAuth();
                        document.getElementById('recovery-email').value = '';
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                }, function(error) {
                    console.error('Erro ao enviar email:', error);
                    showNotification('❌ Erro ao enviar email. Tente novamente mais tarde.', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        
