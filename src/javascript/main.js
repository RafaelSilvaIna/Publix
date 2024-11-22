// Inicialização do AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Toggle do menu mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Animação de contagem para as estatísticas
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const activeUsers = document.getElementById("activeUsers");
const publishedArticles = document.getElementById("publishedArticles");
const totalViews = document.getElementById("totalViews");

animateValue(activeUsers, 0, 10000, 2000);
animateValue(publishedArticles, 0, 50000, 2000);
animateValue(totalViews, 0, 1000000, 2000);

// Gráfico de crescimento
const ctx = document.getElementById('growthChart').getContext('2d');
const growthChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Usuários Ativos',
            data: [1000, 2000, 3500, 5000, 7500, 10000],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Carregar artigos da comunidade dinamicamente
const articleGrid = document.querySelector('.article-grid');

const articles = [
    {
        title: "Como Escrever um Artigo Impactante",
        excerpt: "Aprenda as técnicas dos melhores escritores para criar conteúdo que engaja.",
        image: "https://source.unsplash.com/random/300x200?writing",
        author: {
            name: "João Silva",
            avatar: "https://i.pravatar.cc/40?img=1"
        }
    },
    {
        title: "Dicas de Produtividade para Escritores",
        excerpt: "Maximize seu tempo e produza mais conteúdo de qualidade com estas dicas.",
        image: "https://source.unsplash.com/random/300x200?productivity",
        author: {
            name: "Maria Santos",
            avatar: "https://i.pravatar.cc/40?img=2"
        }
    },
    {
        title: "SEO para Iniciantes: Guia Completo",
        excerpt: "Aprenda os fundamentos de SEO para aumentar a visibilidade dos seus artigos.",
        image: "https://source.unsplash.com/random/300x200?seo",
        author: {
            name: "Carlos Oliveira",
            avatar: "https://i.pravatar.cc/40?img=3"
        }
    }
];

articles.forEach(article => {
    const articleCard = document.createElement('div');
    articleCard.className = 'article-card';
    articleCard.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-author">
                <img src="${article.author.avatar}" alt="${article.author.name}" class="author-avatar">
                <span class="author-name">${article.author.name}</span>
            </div>
        </div>
    `;
    articleGrid.appendChild(articleCard);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

// Modo escuro (toggle)
const body = document.body;
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
document.querySelector('.navbar').appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Estilos para o modo escuro
const darkModeStyles = `
    body.dark-mode {
        background-color: #1a1a1a;
        color: #f0f0f0;
    }
    body.dark-mode .navbar,
    body.dark-mode .feature-card,
    body.dark-mode .article-card {
        background-color: #2c2c2c;
    }
    body.dark-mode .nav-links a,
    body.dark-mode .feature-card h3,
    body.dark-mode .article-title {
        color: #f0f0f0;
    }
    body.dark-mode .btn-secondary {
        background-color: #4a4a4a;
        color: #f0f0f0;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = darkModeStyles;
document.head.appendChild(styleElement);
