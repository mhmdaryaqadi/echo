// 1. Inisialisasi AOS
AOS.init({ once: true, offset: 50 });

// 2. WELCOME SCREEN & MUSIC LOGIC
const welcomeScreen = document.getElementById('welcome-screen');
const enterBtn = document.getElementById('enter-btn');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicFab = document.querySelector('.music-fab');
const heroVideo = document.getElementById('myVideo');

let isPlaying = false;

enterBtn.addEventListener('click', () => {
    // 1. Hilangkan Welcome Screen
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        document.body.style.overflow = 'auto'; // Aktifin scroll lagi
    }, 800);

    // 2. Putar Musik & Video
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = "⏸";
        musicFab.style.display = 'block'; // Munculin tombol musik
        musicBtn.style.animation = "pulse 2s infinite";
    }).catch(err => {
        console.log("Music play failed:", err);
    });

    heroVideo.play();
});

// Tombol Pause/Play Manual (Floating Button)
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🎵";
        musicBtn.style.animation = "none";
    } else {
        bgMusic.play();
        musicBtn.textContent = "⏸";
        musicBtn.style.animation = "pulse 2s infinite";
    }
    isPlaying = !isPlaying;
});

// 3. Navbar Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 4. Efek Ketik
const textElement = document.querySelector('.typing-text');
const words = ["ADA.", "BERSAMA.", "BERCERITA."];
let wordIndex = 0; let charIndex = 0; let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        textElement.textContent = currentWord.substring(0, charIndex++);
    }
    let typeSpeed = isDeleting ? 100 : 200;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeEffect);

// 5. Dark / Light Mode
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = "🌙";
}

themeToggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeToggleBtn.innerHTML = "☀️";
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = "🌙";
        localStorage.setItem('theme', 'light');
    }
});

// 6. Hamburger Menu
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});