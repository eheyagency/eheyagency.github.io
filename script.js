// =========================================================
// 1. HITUNG JUMLAH MEMBER OTOMATIS (BUNGKUS AGAR AMAN)
// =========================================================
const elemenJumlahMember = document.getElementById('jumlahMember');

fetch('kreator.html')
    .then(r => r.text())
    .then(html => {
        const hitung = (html.match(/class="follower-card"/g) || []).length;
        if (hitung > 0 && elemenJumlahMember) {
            elemenJumlahMember.textContent = hitung;
        }
    })
    .catch(() => {
        if (elemenJumlahMember) {
            elemenJumlahMember.textContent = '97';
        }
    });

// =========================================================
// 2. KIRIM KE WHATSAPP & FORM SUBMIT
//    (DIBUNGKUS KONDISI AGAR TIDAK CRASH DI HALAMAN LAIN)
// =========================================================
function kirimKeWhatsApp() {
    const nama = document.getElementById('nama')?.value || '';
    const tiktok = document.getElementById('tiktok')?.value || '';
    const wa = document.getElementById('wa')?.value || '';
    const usia = document.getElementById('usia')?.value || '';
    const alasan = document.getElementById('alasan')?.value || '';

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

// Perbaikan Utama: Cek apakah formDaftar ada di halaman ini
const formDaftar = document.getElementById('formDaftar');
if (formDaftar) {
    formDaftar.addEventListener('submit', e => {
        e.preventDefault();
        kirimKeWhatsApp();
    });
}

// =========================================================
// 3. FLOATING NAVIGATION (TETAP AMAN)
// =========================================================
document.addEventListener("DOMContentLoaded", function () {

    const floatingNav = document.querySelector(".floating-nav");
    const toggleButton = document.getElementById("floatingNavToggle");
    const menu = document.getElementById("floatingNavMenu");

    if (!floatingNav || !toggleButton || !menu) {
        return;
    }

    /* BUKA / TUTUP MENU */
    toggleButton.addEventListener("click", function (event) {
        event.stopPropagation();
        const isActive = floatingNav.classList.toggle("active");

        toggleButton.setAttribute("aria-expanded", isActive ? "true" : "false");
        toggleButton.setAttribute("aria-label", isActive ? "Tutup menu navigasi" : "Buka menu navigasi");
        menu.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    /* KLIK DI LUAR MENU */
    document.addEventListener("click", function (event) {
        if (!floatingNav.contains(event.target)) {
            floatingNav.classList.remove("active");
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute("aria-label", "Buka menu navigasi");
            menu.setAttribute("aria-hidden", "true");
        }
    });

    /* ESC UNTUK MENUTUP MENU */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            floatingNav.classList.remove("active");
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute("aria-label", "Buka menu navigasi");
            menu.setAttribute("aria-hidden", "true");
            toggleButton.focus();
        }
    });

    /* KLIK LINK MENU */
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            floatingNav.classList.remove("active");
            toggleButton.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
        });
    });
});

function redirectToTikTok() {
    // 1. Kredensial Sandbox Anda sudah benar
    const clientKey = 'sbawbsenpxelimpj3k'; 
    
    // 2. Redirect URI Anda sudah benar
    const redirectUri = 'https://eheyagency.web.id'; 
    
    // 3. Scope data dasar
    const scope = 'user.info.basic';
    
    // 4. Teks acak keamanan
    const state = 'ehey_agency_secure_state_123';

    // PERBAIKAN DI SINI: Menggunakan endpoint URL otorisasi v2 yang resmi dan tepat
    const tiktokAuthUrl = `https://tiktok.com` +
                          `?client_key=${clientKey}` +
                          `&scope=${scope}` +
                          `&response_type=code` +
                          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
                          `&state=${state}`;

    // Jalankan pengalihan sistem login
    window.location.href = tiktokAuthUrl;
}
