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

/* =========================================================
   FLOATING NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const floatingNav = document.querySelector(".floating-nav");
    const toggleButton = document.getElementById("floatingNavToggle");
    const menu = document.getElementById("floatingNavMenu");

    if (!floatingNav || !toggleButton || !menu) {
        return;
    }

    /* =========================================
       BUKA / TUTUP MENU
    ========================================= */

    toggleButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const isActive = floatingNav.classList.toggle("active");

        toggleButton.setAttribute(
            "aria-expanded",
            isActive ? "true" : "false"
        );

        toggleButton.setAttribute(
            "aria-label",
            isActive
                ? "Tutup menu navigasi"
                : "Buka menu navigasi"
        );

        menu.setAttribute(
            "aria-hidden",
            isActive ? "false" : "true"
        );
    });


    /* =========================================
       KLIK DI LUAR MENU
    ========================================= */

    document.addEventListener("click", function (event) {

        if (!floatingNav.contains(event.target)) {

            floatingNav.classList.remove("active");

            toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

            toggleButton.setAttribute(
                "aria-label",
                "Buka menu navigasi"
            );

            menu.setAttribute(
                "aria-hidden",
                "true"
            );
        }
    });


    /* =========================================
       ESC UNTUK MENUTUP MENU
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            floatingNav.classList.remove("active");

            toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

            toggleButton.setAttribute(
                "aria-label",
                "Buka menu navigasi"
            );

            menu.setAttribute(
                "aria-hidden",
                "true"
            );

            toggleButton.focus();
        }
    });


    /* =========================================
       KLIK MENU
       MENU AKAN MENUTUP SEBELUM PINDAH HALAMAN
    ========================================= */

    const menuLinks = menu.querySelectorAll("a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            floatingNav.classList.remove("active");

            toggleButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menu.setAttribute(
                "aria-hidden",
                "true"
            );
        });

    });

});
