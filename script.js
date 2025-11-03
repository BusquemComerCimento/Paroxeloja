let users = [];
        let currentUser = null;
        let cart = [];
        let logoAudio = null;

        function initAudio() {
            logoAudio.volume = 1.0;
            
            window.playLogoSound = function() {
                if (logoAudio) {
                    logoAudio.currentTime = 0;
                    logoAudio.play().catch(error => {
                        console.log('Erro ao tocar áudio:', error);
                    });
                    
                    const logo = document.querySelector('.logo');
                    logo.style.textShadow = '0 0 40px rgba(255, 0, 51, 1), 0 0 80px rgba(255, 0, 51, 0.8)';
                    logo.style.transform = 'scale(1.1) rotate(-5deg)';
                    
                    setTimeout(() => {
                        logo.style.textShadow = '0 0 10px rgba(255, 0, 51, 0.8), 0 0 20px rgba(255, 0, 51, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8)';
                        logo.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                }
            };
        }

        document.addEventListener('DOMContentLoaded', initAudio);

        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            sidebar.classList.toggle('open');
        }

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
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Item removido do carrinho! 🗑️', 'success');
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotal = document.getElementById('cart-total');
            const checkoutBtn = document.getElementById('checkout-btn');

            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-ghost"></i>
                        <p>Tem nada aqui não doido</p>
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

        document.addEventListener('DOMContentLoaded', function() {
            const categoryBtns = document.querySelectorAll('.category-btn');
            const productCards = document.querySelectorAll('.product-card');

            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const category = this.dataset.category;

                    productCards.forEach(card => {
                        if (category === 'all') {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                        } else if (card.dataset.category === category) {
                            card.classList.remove('hidden');
                            card.style.display = 'block';
                        } else {
                            card.classList.add('hidden');
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        });

        function showLogin() {
            closeAuth();
            document.getElementById('login-container').style.display = 'flex';
        }

        function showRegister() {
            closeAuth();
            document.getElementById('register-container').style.display = 'flex';
        }

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
            
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
        }

        function recoverPassword(event) {
            event.preventDefault();
            const email = document.getElementById('recovery-email').value;
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

        function openSecretPage() {
            document.getElementById('secret-page').classList.add('active');
            document.body.style.overflow = 'hidden';
            showNotification('🔥 VOCÊ ENCONTROU O PRODUTO SECRETO! 🔥', 'success');
        }

        function closeSecretPage() {
            document.getElementById('secret-page').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1.5rem 2.5rem;
                background: ${type === 'success' ? '#ff0033' : '#000'};
                color: #fff;
                border: 3px solid ${type === 'success' ? '#fff' : '#ff0033'};
                z-index: 5000;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                animation: slideIn 0.3s ease;
                box-shadow: 0 10px 30px rgba(255, 0, 51, 0.6);
                max-width: 400px;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3500);
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAuth();
                closeSecretPage();
                const sidebar = document.getElementById('cart-sidebar');
                if (sidebar.classList.contains('open')) {
                    toggleCart();
                }
            }
        });

        window.addEventListener('scroll', function() {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            if (hero) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });