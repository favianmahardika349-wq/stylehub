// ==========================================
// STYLEHUB - CHECKOUT.JS FINAL
// ==========================================


// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(number) || 0);

}


// ==========================================
// AMBIL CART DARI LOCAL STORAGE
// ==========================================

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    } catch (error) {

        console.error("Cart error:", error);

        return [];

    }

}


// ==========================================
// TAMPILKAN PRODUK DI CHECKOUT
// ==========================================

function displayCheckout() {

    const container =
        document.getElementById("checkoutItems");


    if (!container) return;


    const cart = getCart();


    // Jika cart kosong

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center py-4">

                <div style="font-size:50px;">
                    🛒
                </div>

                <h5 class="fw-bold">
                    Keranjang Kosong
                </h5>

                <p class="text-secondary">
                    Belum ada produk yang dipilih.
                </p>

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Belanja Sekarang

                </a>

            </div>

        `;

        updateTotal();

        return;

    }


    let subtotal = 0;

    let html = "";


    cart.forEach(function(item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        html += `

            <div
                class="d-flex align-items-center mb-3"
                style="gap:12px;"
            >

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Produk"}"
                    style="
                        width:60px;
                        height:70px;
                        object-fit:cover;
                        border-radius:8px;
                        background:#eee;
                    "
                >


                <div class="flex-grow-1">

                    <strong>
                        ${item.name || "Produk"}
                    </strong>

                    <br>

                    <small class="text-secondary">

                        Ukuran:
                        ${item.size || "-"}

                        <br>

                        Jumlah:
                        ${quantity}

                    </small>

                </div>


                <strong>

                    ${formatRupiah(itemTotal)}

                </strong>

            </div>

        `;

    });


    container.innerHTML = html;


    updateTotal(subtotal);

}


// ==========================================
// UPDATE TOTAL
// ==========================================

function updateTotal(subtotal = null) {

    if (subtotal === null) {

        const cart = getCart();

        subtotal = 0;


        cart.forEach(function(item) {

            subtotal +=
                Number(item.price) *
                Number(item.quantity);

        });

    }


    const shippingElement =
        document.getElementById("shipping");


    const shipping =
        shippingElement
            ? Number(shippingElement.value)
            : 15000;


    const subtotalElement =
        document.getElementById("subtotal");


    const shippingElementPrice =
        document.getElementById("shippingPrice");


    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            formatRupiah(subtotal);

    }


    if (shippingElementPrice) {

        shippingElementPrice.textContent =
            formatRupiah(shipping);

    }


    if (totalElement) {

        totalElement.textContent =
            formatRupiah(
                subtotal + shipping
            );

    }

}


// ==========================================
// GANTI ONGKIR
// ==========================================

function updateShipping() {

    updateTotal();

}


// ==========================================
// BUAT PESANAN
// ==========================================

function createOrder() {

    console.log(
        "✅ CREATE ORDER DIJALANKAN"
    );


    // ======================================
    // AMBIL CART
    // ======================================

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong!"
        );

        return;

    }


    // ======================================
    // AMBIL ELEMENT
    // ======================================

    const nameElement =
        document.getElementById(
            "customerName"
        );


    const phoneElement =
        document.getElementById(
            "customerPhone"
        );


    const addressElement =
        document.getElementById(
            "customerAddress"
        );


    const shippingElement =
        document.getElementById(
            "shipping"
        );


    const paymentElement =
        document.getElementById(
            "payment"
        );


    // ======================================
    // CEK ELEMENT
    // ======================================

    if (
        !nameElement ||
        !phoneElement ||
        !addressElement ||
        !shippingElement ||
        !paymentElement
    ) {

        alert(
            "Form checkout tidak ditemukan!"
        );

        return;

    }


    // ======================================
    // AMBIL VALUE
    // ======================================

    const name =
        nameElement.value.trim();


    const phone =
        phoneElement.value.trim();


    const address =
        addressElement.value.trim();


    const shipping =
        Number(
            shippingElement.value
        ) || 15000;


    const payment =
        paymentElement.value;


    // ======================================
    // VALIDASI
    // ======================================

    if (name === "") {

        alert(
            "Nama penerima belum diisi!"
        );

        nameElement.focus();

        return;

    }


    if (phone === "") {

        alert(
            "Nomor HP belum diisi!"
        );

        phoneElement.focus();

        return;

    }


    if (address === "") {

        alert(
            "Alamat belum diisi!"
        );

        addressElement.focus();

        return;

    }


    if (payment === "") {

        alert(
            "Silakan pilih metode pembayaran!"
        );

        paymentElement.focus();

        return;

    }


    // ======================================
    // HITUNG SUBTOTAL
    // ======================================

    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    // ======================================
    // HITUNG TOTAL
    // ======================================

    const total =
        subtotal + shipping;


    // ======================================
    // NOMOR PESANAN
    // ======================================

    const orderId =
        "SH-" +
        Date.now();


    // ======================================
    // TANGGAL
    // ======================================

    const date =
        new Date().toLocaleString(
            "id-ID",
            {
                dateStyle: "long",
                timeStyle: "short"
            }
        );


    // ======================================
    // BUAT OBJECT ORDER
    // ======================================

    const order = {

        orderId: orderId,

        date: date,

        customer: {

            name: name,

            phone: phone,

            address: address

        },

        items: cart,

        subtotal: subtotal,

        shipping: shipping,

        payment: payment,

        total: total

    };


    // ======================================
    // SIMPAN ORDER
    // ======================================

    try {

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(order)
        );

    } catch (error) {

        console.error(
            "Gagal menyimpan order:",
            error
        );

        alert(
            "Pesanan gagal disimpan!"
        );

        return;

    }


    // ======================================
    // KOSONGKAN CART
    // ======================================

    localStorage.removeItem("cart");


    // ======================================
    // REDIRECT INVOICE
    // ======================================

    console.log(
        "✅ Order berhasil dibuat:",
        order
    );


    window.location.href =
        "invoice.html";

}


// ==========================================
// SAAT HALAMAN DIBUKA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Tampilkan produk

        displayCheckout();


        // ==================================
        // EVENT ONGKIR
        // ==================================

        const shipping =
            document.getElementById(
                "shipping"
            );


        if (shipping) {

            shipping.addEventListener(
                "change",
                updateShipping
            );

        }


        // ==================================
        // TOMBOL BAYAR
        // ==================================

        const payButton =
            document.getElementById(
                "payButton"
            );


        if (payButton) {

            payButton.addEventListener(
                "click",
                createOrder
            );

        }

    }
);
