// Hitung jumlah member otomatis
fetch('followers.html')
    .then(r => r.text())
    .then(html => {
        const hitung = (html.match(/class="follower-card"/g) || []).length;
        if (hitung > 0) document.getElementById('jumlahMember').textContent = hitung;
    })
    .catch(() => {
        document.getElementById('jumlahMember').textContent = '97';
    });

// Kirim ke WhatsApp
function kirimKeWhatsApp() {
    const nama = document.getElementById('nama').value;
    const tiktok = document.getElementById('tiktok').value;
    const wa = document.getElementById('wa').value;
    const usia = document.getElementById('usia').value;
    const alasan = document.getElementById('alasan').value;

    const kategoriCheck = document.querySelectorAll('input[name="kategori"]:checked');
    let kategori = [];
    kategoriCheck.forEach(cb => kategori.push(cb.parentElement.textContent.trim()));
    kategori = kategori.length ? kategori.join(', ') : 'Tidak dipilih';

    const pesan = `Halo! Saya ingin mendaftar sebagai member EHEY AGENCY:\n\n` +
        `📋 Nama Lengkap: ${nama}\n` +
        `🎵 Username TikTok: ${tiktok}\n` +
        `📱 Nomor WhatsApp: ${wa}\n` +
        `🎂 Usia: ${usia}\n` +
        `🏷️ Kategori Konten: ${kategori}\n` +
        `💬 Alasan Bergabung:\n${alasan || 'Tidak diisi'}`;

    const nomorTujuan = '6285398557520';
    window.open(`https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// Pasang event submit form
document.getElementById('formDaftar').addEventListener('submit', e => {
    e.preventDefault();
    kirimKeWhatsApp();
});

// ==================================================
// MENU NAVIGASI — VERSI PASTI BERJALAN
// ==================================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');

    if (!menuToggle || !menuContent) return;

    // Klik tombol → buka/tutup
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Cek & ganti status
        const sedangBuka = menuContent.classList.contains('active');
        
        if (sedangBuka) {
            menuToggle.classList.remove('active');
            menuContent.classList.remove('active');
        } else {
            menuToggle.classList.add('active');
            menuContent.classList.add('active');
        }
    });

    // Klik di luar → tutup
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !menuContent.contains(e.target)) {
            menuToggle.classList.remove('active');
            menuContent.classList.remove('active');
        }
    });

    // Klik di dalam menu → jangan tutup
    menuContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
