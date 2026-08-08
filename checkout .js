const form = document.getElementById("checkoutForm");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// FORMAT RUPIAH
// ===============================

function rupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

}


// ===============================
// TAMPILKAN CHECKOUT
// ===============================

function tampilkanCheckout() {

    const container =
        document.getElementById("checkoutItems");

    let subtotal = 0;

    container.innerHTML = "";

    cart.forEach(item => {

        const harga =
            item.price * item.quantity;

        subtotal += harga;

        container.innerHTML += `
            <div class="mb-3">

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    Ukuran: ${item.size}
                    <br>
                    Jumlah: ${item.quantity}
                </small>

                <br>

                <strong>
                    ${rupiah(harga)}
                </strong>

            </div>
        `;

    });


    updateTotal(subtotal);

}


// ===============================
// TOTAL
// ===============================

function updateTotal(subtotal) {

    const shipping =
        Number(
            document.getElementById("shipping").value
        );


    document.getElementById("subtotal")
        .textContent =
        rupiah(subtotal);


    document.getElementById("shippingPrice")
        .textContent =
        rupiah(shipping);


    document.getElementById("total")
        .textContent =
        rupiah(
            subtotal + shipping
        );

}


// ===============================
// GANTI ONGKIR
// ===============================

document
    .getElementById("shipping")
    .addEventListener("change", function () {

        let subtotal = 0;

        cart.forEach(item => {

            subtotal +=
                item.price *
                item.quantity;

        });

        updateTotal(subtotal);

    });


// ===============================
// BAYAR
// ===============================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const nama =
        document.getElementById(
            "customerName"
        ).value.trim();


    const hp =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const alamat =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const kurir =
        Number(
            document.getElementById(
                "shipping"
            ).value
        );


    const pembayaran =
        document.getElementById(
            "payment"
        ).value;


    // Validasi
    if (
        nama === "" ||
        hp === "" ||
        alamat === "" ||
        pembayaran === ""
    ) {

        alert(
            "Harap lengkapi semua data!"
        );

        return;

    }


    // Hitung subtotal
    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    const total =
        subtotal + kurir;


    // ===============================
    // DATA INVOICE
    // ===============================

    const order = {

        orderId:
            "SH-" + Date.now(),

        date:
            new Date().toLocaleString(
                "id-ID"
            ),

        customer: {

            name: nama,

            phone: hp,

            address: alamat

        },

        shipping: kurir,

        payment: pembayaran,

        items: cart,

        subtotal: subtotal,

        total: total

    };


    // ===============================
    // SIMPAN INVOICE
    // ===============================

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // Hapus keranjang
    localStorage.removeItem("cart");


    // Pindah ke invoice
    window.location.href =
        "invoice.html";

});


// Jalankan
tampilkanCheckout();