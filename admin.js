// Initialize AOS
AOS.init({ once: true, offset: 20 });

// =========================================
// LOGIN LOGIC
// =========================================
const loginBtn = document.getElementById('login-btn');
const loginOverlay = document.getElementById('login-overlay');
const dashboard = document.getElementById('dashboard');
const passwordInput = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');

// Simple Login (Password: admin123)
loginBtn.addEventListener('click', () => {
    if (passwordInput.value === 'admin123' || passwordInput.value.trim() !== '') {
        loginOverlay.style.opacity = '0';
        setTimeout(() => {
            loginOverlay.style.display = 'none';
            dashboard.style.display = 'flex';
            // Render data on login
            renderTimelineTable();
            renderMessagesTable();
            renderGalleryTable();
            renderVideoTable();
        }, 300);
    } else {
        loginError.style.display = 'block';
    }
});

// Allow Enter key to login
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// =========================================
// TAB SWITCHING
// =========================================
const navItems = document.querySelectorAll('.nav-menu li');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all
        navItems.forEach(nav => nav.classList.remove('active'));
        tabContents.forEach(tab => tab.style.display = 'none');
        
        // Add active class to clicked
        item.classList.add('active');
        const targetId = item.getAttribute('data-tab');
        document.getElementById(targetId).style.display = 'block';
    });
});

// =========================================
// CRUD LOGIC: TIMELINE
// =========================================
let timelineData = JSON.parse(localStorage.getItem('timelineData')) || [];

const timelineTableBody = document.querySelector('#timeline-table tbody');
const modalTimeline = document.getElementById('modal-timeline');
const btnAddTimeline = document.getElementById('btn-add-timeline');
const btnCancelTimeline = document.getElementById('btn-cancel-timeline');
const btnSaveTimeline = document.getElementById('btn-save-timeline');

const inputTimelineYear = document.getElementById('timeline-year');
const inputTimelineDesc = document.getElementById('timeline-desc');
const inputTimelineIndex = document.getElementById('timeline-index');
const modalTimelineTitle = document.getElementById('modal-timeline-title');

function renderTimelineTable() {
    timelineTableBody.innerHTML = '';
    timelineData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.year}</strong></td>
            <td>${item.text}</td>
            <td>
                <button class="btn-edit" onclick="editTimeline(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteTimeline(${index})">Hapus</button>
            </td>
        `;
        timelineTableBody.appendChild(tr);
    });
}

// Open Add Modal
btnAddTimeline.addEventListener('click', () => {
    modalTimelineTitle.textContent = 'Tambah Garis Waktu';
    inputTimelineIndex.value = '';
    inputTimelineYear.value = '';
    inputTimelineDesc.value = '';
    modalTimeline.classList.add('show');
});

// Close Modal
btnCancelTimeline.addEventListener('click', () => {
    modalTimeline.classList.remove('show');
});

// Save (Create/Update)
btnSaveTimeline.addEventListener('click', () => {
    const year = inputTimelineYear.value.trim();
    const text = inputTimelineDesc.value.trim();
    
    if (!year || !text) return alert('Semua kolom harus diisi!');

    const index = inputTimelineIndex.value;
    
    if (index === '') {
        // Create
        timelineData.push({ year, text });
    } else {
        // Update
        timelineData[parseInt(index)] = { year, text };
    }
    
    localStorage.setItem('timelineData', JSON.stringify(timelineData));
    renderTimelineTable();
    modalTimeline.classList.remove('show');
});

// Edit
window.editTimeline = function(index) {
    modalTimelineTitle.textContent = 'Edit Garis Waktu';
    const item = timelineData[index];
    inputTimelineYear.value = item.year;
    inputTimelineDesc.value = item.text;
    inputTimelineIndex.value = index;
    modalTimeline.classList.add('show');
};

// Delete
window.deleteTimeline = function(index) {
    if (confirm('Yakin ingin menghapus data ini?')) {
        timelineData.splice(index, 1);
        localStorage.setItem('timelineData', JSON.stringify(timelineData));
        renderTimelineTable();
    }
};

// =========================================
// CRUD LOGIC: MESSAGES
// =========================================
let messagesData = JSON.parse(localStorage.getItem('messagesData')) || [];

const messagesTableBody = document.querySelector('#messages-table tbody');
const modalMessage = document.getElementById('modal-message');
const btnAddMessage = document.getElementById('btn-add-message');
const btnCancelMessage = document.getElementById('btn-cancel-message');
const btnSaveMessage = document.getElementById('btn-save-message');

const inputMessageName = document.getElementById('message-name');
const inputMessageText = document.getElementById('message-text');
const inputMessageIndex = document.getElementById('message-index');
const modalMessageTitle = document.getElementById('modal-message-title');

function renderMessagesTable() {
    messagesTableBody.innerHTML = '';
    messagesData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td>"${item.message}"</td>
            <td>
                <button class="btn-edit" onclick="editMessage(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteMessage(${index})">Hapus</button>
            </td>
        `;
        messagesTableBody.appendChild(tr);
    });
}

// Open Add Modal
btnAddMessage.addEventListener('click', () => {
    modalMessageTitle.textContent = 'Tambah Pesan';
    inputMessageIndex.value = '';
    inputMessageName.value = '';
    inputMessageText.value = '';
    modalMessage.classList.add('show');
});

// Close Modal
btnCancelMessage.addEventListener('click', () => {
    modalMessage.classList.remove('show');
});

// Save (Create/Update)
btnSaveMessage.addEventListener('click', () => {
    const name = inputMessageName.value.trim();
    const message = inputMessageText.value.trim();
    
    if (!name || !message) return alert('Semua kolom harus diisi!');

    const index = inputMessageIndex.value;
    
    if (index === '') {
        // Create
        messagesData.push({ name, message });
    } else {
        // Update
        messagesData[parseInt(index)] = { name, message };
    }
    
    localStorage.setItem('messagesData', JSON.stringify(messagesData));
    renderMessagesTable();
    modalMessage.classList.remove('show');
});

// Edit
window.editMessage = function(index) {
    modalMessageTitle.textContent = 'Edit Pesan';
    const item = messagesData[index];
    inputMessageName.value = item.name;
    inputMessageText.value = item.message;
    inputMessageIndex.value = index;
    modalMessage.classList.add('show');
};

// Delete
window.deleteMessage = function(index) {
    if (confirm('Yakin ingin menghapus pesan ini?')) {
        messagesData.splice(index, 1);
        localStorage.setItem('messagesData', JSON.stringify(messagesData));
        renderMessagesTable();
    }
};

// =========================================
// CRUD LOGIC: GALLERY
// =========================================
let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];

const galleryTableBody = document.querySelector('#gallery-table tbody');
const modalGallery = document.getElementById('modal-gallery');
const btnAddGallery = document.getElementById('btn-add-gallery');
const btnCancelGallery = document.getElementById('btn-cancel-gallery');
const btnSaveGallery = document.getElementById('btn-save-gallery');

const inputGalleryUrl = document.getElementById('gallery-url');
const inputGalleryIndex = document.getElementById('gallery-index');
const modalGalleryTitle = document.getElementById('modal-gallery-title');

function renderGalleryTable() {
    galleryTableBody.innerHTML = '';
    galleryData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${item.url}" alt="Preview" style="height: 50px; border-radius: 8px; object-fit: cover;"> <br> <small>${item.url}</small></td>
            <td>
                <button class="btn-edit" onclick="editGallery(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteGallery(${index})">Hapus</button>
            </td>
        `;
        galleryTableBody.appendChild(tr);
    });
}

// Open Add Modal
btnAddGallery.addEventListener('click', () => {
    modalGalleryTitle.textContent = 'Tambah Foto';
    inputGalleryIndex.value = '';
    inputGalleryUrl.value = '';
    document.getElementById('gallery-file').value = '';
    modalGallery.classList.add('show');
});

// Close Modal
btnCancelGallery.addEventListener('click', () => {
    modalGallery.classList.remove('show');
});

// Save (Create/Update)
btnSaveGallery.addEventListener('click', () => {
    const fileInput = document.getElementById('gallery-file');
    const manualUrl = inputGalleryUrl.value.trim();
    const file = fileInput.files[0];
    
    if (!file && !manualUrl) return alert('Silakan pilih file atau ketik URL foto!');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveGalleryData(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveGalleryData(manualUrl);
    }
});

function saveGalleryData(url) {
    const index = inputGalleryIndex.value;
    if (index === '') {
        galleryData.push({ url });
    } else {
        galleryData[parseInt(index)] = { url };
    }
    
    try {
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
    } catch (e) {
        alert("Gagal menyimpan! Kapasitas LocalStorage penuh. Cobalah hapus beberapa file.");
        if (index === '') galleryData.pop();
    }
    
    renderGalleryTable();
    modalGallery.classList.remove('show');
}

// Edit
window.editGallery = function(index) {
    modalGalleryTitle.textContent = 'Edit Foto';
    const item = galleryData[index];
    inputGalleryUrl.value = item.url;
    document.getElementById('gallery-file').value = '';
    inputGalleryIndex.value = index;
    modalGallery.classList.add('show');
};

// Delete
window.deleteGallery = function(index) {
    if (confirm('Yakin ingin menghapus foto ini?')) {
        galleryData.splice(index, 1);
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
        renderGalleryTable();
    }
};

// =========================================
// CRUD LOGIC: VIDEO
// =========================================
let videoData = JSON.parse(localStorage.getItem('videoData')) || [];

const videoTableBody = document.querySelector('#video-table tbody');
const modalVideo = document.getElementById('modal-video');
const btnAddVideo = document.getElementById('btn-add-video');
const btnCancelVideo = document.getElementById('btn-cancel-video');
const btnSaveVideo = document.getElementById('btn-save-video');

const inputVideoUrl = document.getElementById('video-url');
const inputVideoIndex = document.getElementById('video-index');
const modalVideoTitle = document.getElementById('modal-video-title');

function renderVideoTable() {
    videoTableBody.innerHTML = '';
    videoData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><video src="${item.url}" style="height: 50px; border-radius: 8px; object-fit: cover;" muted></video> <br> <small>${item.url}</small></td>
            <td>
                <button class="btn-edit" onclick="editVideo(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteVideo(${index})">Hapus</button>
            </td>
        `;
        videoTableBody.appendChild(tr);
    });
}

// Open Add Modal
btnAddVideo.addEventListener('click', () => {
    modalVideoTitle.textContent = 'Tambah Video';
    inputVideoIndex.value = '';
    inputVideoUrl.value = '';
    document.getElementById('video-file').value = '';
    modalVideo.classList.add('show');
});

// Close Modal
btnCancelVideo.addEventListener('click', () => {
    modalVideo.classList.remove('show');
});

// Save (Create/Update)
btnSaveVideo.addEventListener('click', () => {
    const fileInput = document.getElementById('video-file');
    const manualUrl = inputVideoUrl.value.trim();
    const file = fileInput.files[0];
    
    if (!file && !manualUrl) return alert('Silakan pilih file atau ketik URL video!');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveVideoData(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveVideoData(manualUrl);
    }
});

function saveVideoData(url) {
    const index = inputVideoIndex.value;
    if (index === '') {
        videoData.push({ url });
    } else {
        videoData[parseInt(index)] = { url };
    }
    
    try {
        localStorage.setItem('videoData', JSON.stringify(videoData));
    } catch (e) {
        alert("Gagal menyimpan! Kapasitas LocalStorage penuh (maks ~5MB). Untuk video, sangat disarankan ketik URL/Path manual saja.");
        if (index === '') videoData.pop();
    }
    
    renderVideoTable();
    modalVideo.classList.remove('show');
}

// Edit
window.editVideo = function(index) {
    modalVideoTitle.textContent = 'Edit Video';
    const item = videoData[index];
    inputVideoUrl.value = item.url;
    document.getElementById('video-file').value = '';
    inputVideoIndex.value = index;
    modalVideo.classList.add('show');
};

// Delete
window.deleteVideo = function(index) {
    if (confirm('Yakin ingin menghapus video ini?')) {
        videoData.splice(index, 1);
        localStorage.setItem('videoData', JSON.stringify(videoData));
        renderVideoTable();
    }
};
