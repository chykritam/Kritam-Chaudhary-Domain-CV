// 1. Crop Yield Calculator
function calculateYield() {
    let landArea = parseFloat(document.getElementById('jsLandArea').value) || 0;
    let yieldPerAcre = parseFloat(document.getElementById('jsYieldPerAcre').value) || 0;
    let totalYield = landArea * yieldPerAcre;
    
    let totalElement = document.getElementById('jsTotal');
    if (totalElement) {
        totalElement.innerText = totalYield.toFixed(0);
    }
}

// 2. Custom Scrollspy (Active nav link on scroll)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-tracker .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) { 
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 3. Scroll Animations (Fade in elements as they come into view)
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// 4. Background Canvas Animation (Floating particles)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < (canvas.width * canvas.height) / 18000; i++) {
        particles.push(new Particle());
    }
}

init();

function animateBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    requestAnimationFrame(animateBg);
}

animateBg();