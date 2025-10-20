1. Informações Básicas

Título do Projeto: ParoxeLoja – Loja de Góticas Online
Alunos(as): João Vitor, Felipe e Gabriel
Link do Projeto Online: (ex: https://paroxeloja.netlify.app
)
Link do Repositório GitHub: se vc esta lendo isso ja esta nele
)

2. Descrição do Projeto

O projeto ParoxeLoja é uma página web com estética gótica e temática humorística que simula uma loja online de produtos fictícios.
O objetivo é praticar a criação de um e-commerce interativo, com recursos de login, cadastro, carrinho de compras, filtros de produtos e recuperação de senha.
A proposta mistura humor e design alternativo, refletindo o estilo visual dark/Y2K dos autores.

3. Funcionalidades Implementadas

HTML

Uso de estrutura semântica: <header>, <nav>, <main>, <section>, <footer>.

Formulários para login, cadastro e recuperação de senha.

Listas não ordenadas para o menu de navegação e para os produtos.

Inserção de imagens com texto alternativo (alt).

Ícones do Font Awesome para botões e redes sociais.

CSS

Layout totalmente responsivo (uso de @media queries para telas menores).

Organização com Flexbox e Grid Layout nas seções de produtos e equipe.

Estilização personalizada com cores (#ff0033 e preto predominantes) e fontes do Google Fonts (Metal Mania, Creepster).

Animações e transições (hover, float, shake, slideIn) aplicadas em botões, banners e cards.

Efeito “glitch” na logo e animações nos elementos de destaque.

JavaScript

Sistema de login, cadastro e logout com validações de formulário.

Carrinho de compras dinâmico, com adição, remoção e cálculo de total.

Filtro por categoria dos produtos.

Notificações personalizadas (mensagens de sucesso ou erro).

Recuperação de senha via EmailJS.

Efeitos visuais dinâmicos (parallax no banner, animação nos produtos ao rolar a página).

Atalhos de teclado (ESC para fechar menus e Ctrl + K para abrir o carrinho).

Botão flutuante de carrinho com contador animado.

4. Desafios e Soluções

Desafio 1: Fazer o carrinho de compras funcionar corretamente e atualizar o total automaticamente.
Solução: Criamos um array cart[] no JavaScript e funções específicas (addToCart(), removeFromCart(), updateCart()) que manipulam o DOM e recalculam os valores.

Desafio 2: Implementar o sistema de recuperação de senha com envio de e-mail.
Solução: Usamos o EmailJS para enviar mensagens automáticas com códigos de recuperação.

Desafio 3: Tornar o layout responsivo e manter a estética gótica.
Solução: Usamos Flexbox, Grid e @media queries com transições suaves para adaptar o design sem perder o estilo.

5. Aprendizados e Reflexões

Aprendemos a integrar HTML, CSS e JavaScript de forma prática, criando uma aplicação web funcional.
Foi reforçado o uso de validação de formulários, manipulação do DOM e boas práticas de design responsivo.
Também desenvolvemos habilidades de trabalho em equipe, organização de código e resolução de erros lógicos.

Se refizéssemos o projeto, integraríamos um banco de dados real e armazenamento local (localStorage) para salvar usuários e carrinhos entre sessões.

6. Contribuição Individual

João Vitor (Paroxetina20mg):
Responsável pela estrutura geral (HTML), estilização completa (CSS), design visual e efeitos animados.
Também configurou o sistema de recuperação de senha via EmailJS.

Felipe (Felps0072):
Trabalhou na parte lógica do JavaScript, incluindo login, registro e carrinho.
Ajudou na organização do código e nas ideias de layout e conteúdo do site.

Gabriel (Megaplayer):
Contribuiu com ideias criativas para o conteúdo, seleção de imagens e nomes dos produtos.
Auxiliou na revisão geral do design, no equilíbrio do estilo visual e na correção de bugs de exibição.
Também foi responsável por testar o site em diferentes dispositivos e sugerir melhorias na usabilidade.
