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

// 7. Dynamic Content (Timeline & Messages) from LocalStorage

// Data Default
const defaultTimeline = [
    { year: "2021", text: "Pertama kali kenal om gilang dengan wajah jakamnya." },
    { year: "2022 - 2023", text: "Maennya sirkel." },
    { year: "2024", text: "Pengangguran." }
];

const defaultMessages = [
    { name: "Rizki (Sipaling gunung)", message: "info gunung, mas" },
    { name: "Panji", message: "Ajak gua lah." },
    { name: "Tulus", message: "cukup tau." }
];

// Data Default Foto & Video
const defaultGallery = [
    { url: "foto/3.jpg" }, { url: "foto/1.JPG" }, { url: "foto/9.jpeg" }, { url: "foto/eko.JPG" },
    { url: "foto/5.jpeg" }, { url: "foto/11.jpeg" }, { url: "foto/4.jpeg" }, { url: "foto/6.jpeg" },
    { url: "foto/7.jpeg" }, { url: "foto/8.jpeg" }, { url: "foto/10.jpeg" }, { url: "foto/12.jpeg" }
];

const defaultVideo = [
    { url: "video/2.mp4" },
    { url: "video/1.mp4" }
];

// Initialize Data if not exists
if (!localStorage.getItem('timelineData')) {
    localStorage.setItem('timelineData', JSON.stringify(defaultTimeline));
}
if (!localStorage.getItem('messagesData')) {
    localStorage.setItem('messagesData', JSON.stringify(defaultMessages));
}
if (!localStorage.getItem('galleryData')) {
    localStorage.setItem('galleryData', JSON.stringify(defaultGallery));
}
if (!localStorage.getItem('videoData')) {
    localStorage.setItem('videoData', JSON.stringify(defaultVideo));
}

// Render Timeline
function renderTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    if(!timelineContainer) return;
    
    const timelineData = JSON.parse(localStorage.getItem('timelineData')) || [];
    timelineContainer.innerHTML = '';
    
    timelineData.forEach((item, index) => {
        const position = index % 2 === 0 ? 'left' : 'right';
        const animation = index % 2 === 0 ? 'fade-right' : 'fade-left';
        
        const html = `
            <div class="timeline-item ${position}" data-aos="${animation}">
                <div class="content">
                    <h3>${item.year}</h3>
                    <p>${item.text}</p>
                </div>
            </div>
        `;
        timelineContainer.innerHTML += html;
    });
}

// Render Messages
function renderMessages() {
    const messagesContainer = document.getElementById('messages-container');
    if(!messagesContainer) return;
    
    const messagesData = JSON.parse(localStorage.getItem('messagesData')) || [];
    messagesContainer.innerHTML = '';
    
    messagesData.forEach((item, index) => {
        const delay = index * 100;
        const initial = item.name.charAt(0).toUpperCase();
        const html = `
            <div class="card" data-aos="flip-up" data-aos-delay="${delay}">
                <div class="profile-icon">${initial}</div>
                <p>"${item.message}"</p>
                <h5>- ${item.name}</h5>
            </div>
        `;
        messagesContainer.innerHTML += html;
    });
}

// Render Gallery
function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if(!galleryContainer) return;
    
    const galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];
    galleryContainer.innerHTML = '';
    
    galleryData.forEach((item) => {
        const html = `
            <div class="masonry-item" data-aos="zoom-in">
                <img src="${item.url}" alt="Foto">
            </div>
        `;
        galleryContainer.innerHTML += html;
    });
}

// Render Video
function renderVideo() {
    const videoContainer = document.getElementById('video-container');
    if(!videoContainer) return;
    
    const videoData = JSON.parse(localStorage.getItem('videoData')) || [];
    videoContainer.innerHTML = '';
    
    videoData.forEach((item) => {
        const html = `
            <div class="video-wrapper vertical-video" data-aos="fade-up">
                <video width="100%" height="100%" autoplay muted loop playsinline style="object-fit: cover;">
                    <source src="${item.url}" type="video/mp4">
                </video>
            </div>
        `;
        videoContainer.innerHTML += html;
    });
}

// Execute render on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderMessages();
    renderGallery();
    renderVideo();
});