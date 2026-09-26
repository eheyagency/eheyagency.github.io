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
