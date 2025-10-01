// FUNGSI kirim data checkout ke whatsApp
// ===================
function kirimWhatsapp(e){
    e.preventDefault();
    let nama = document.getElementById("nama").value;
    let alamat = document.getElementById("alamat").value;
    let hp = document.getElementById("hp").value;

    // BUAT ISI PESAN WHATSAPP
    let pesan = `Halo, Saya ${nama}, ingin pesan. Alamat: ${alamat}, Nomor HP: ${hp}`;

    // BUKA LINK WHATSAPP DENGAN ISI PESAN 
    window.open("https://wa.me/6281234567890?text=" +  encodeURIComponent(pesan), "_blank");

    // TAMPILAN TOAST NOTIFIKASI BERHASIL
    showToast("Pesanan berhasil di kirim ke WhatsApp!");
}

// =====================
// CEK LOGIN USER DENGAN LOCALSTORAGE
// =====================
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if(user){
    document.getElementById("loginMenu").innerHTML = `<a href = "#">Halo, ${user.nama}</a>`;
    document.getElementById("registerMenu").innerHTML = `<a href = "#" id="logoutBtn">Logout</a>`;

// TAMBAHKAN EVENT UNTUK LOGOUT
document.getElementById("logoutBtn").addEventListener("click", function(e){
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    showToast("Anda telah logout!");
    window.location.reload();
});
}

// ========================
//  FUNGSI KERANJANG BELANJA
// ========================
let keranjang =[];
const tombolTambah = document.querySelectorAll(".tambah-keranjang");

// Tambahkan produk saat tombol diklik
tombolTambah.forEach((btn) => {
    btn.addEventListener("click", () => {
        const produkItem = btn.parentElement;
        const namaProduk = produkItem.querySelector("h3").innerText;
        const hargaProduk = parseInt(produkItem.querySelector("p").innerText.replace("Rp","").replace(".",""));

        // CEK APAKAH PRODUK SUDAH ADA DIKERANJANG
        const cekProduk = keranjang.find(item => item.nama === namaProduk);
        if(cekProduk){
            cekProduk.jumlah += 1;
        } else {
            keranjang.push({nama: namaProduk, harga: hargaProduk, jumlah:1});
        }
        renderKeranjang();

        // TAMPILKAN NOTIFIKASI TOAST
        showToast(`${namaProduk} ditambahkan ke keranjang!`);
    });
});

// ====================
// FUNGSI RENDER KERANJANG
// ====================
function renderKeranjang(){
    const daftar = document.getElementById("daftar-keranjang");
    daftar.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, i) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        // TAMBAHKAN BARIS TABEL UNTUK SETIAP ITEM 
        daftar.innerHTML += `<tr>
        <td>${item.nama}</td> <!-- Nama produk -->
        <td>${item.jumlah}</td> <!-- Jumlah produk -->
        <td>Rp ${item.harga}</td> <!-- Harga satuan -->
        <td>Rp ${subtotal}</td> <!-- Total harga produk -->
        <td><button onclick="hapusItem(${i})">Hapus</button></td> <!-- Tombol Hapus-->
        </tr>`;
    });       
        document.getElementById("total-belanja").innerText = total;
}

// ================
// FUNGSI HAPUS ITEM DARI KERANJANG
// ================
function hapusItem(index){
    const namaProduk = keranjang[index].nama;
    keranjang.splice(index, 1);
    renderKeranjang();

    // TAMPILKAN NOTIFIKASI TOAST
     showToast(`${namaProduk} di hapus dari keranjang`);
}

// ==================
// FUNGSI TOAST NOTIFIKASI
// ==================
function showToast(massage) {
    const toast = document.getElementById("toast");
    toast.innerText = massage;
    toast.style.display = "block";

    // HILANGKAN OTOMATIS SETELAH 3 DETIK
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}