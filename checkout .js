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
    }).format(number);

}


// ==========================================
// AMBIL CART
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
// TAMPILKAN CHECKOUT
// ==========================================

function displayCheckout() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;


    const cart = getCart();


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="text-center py-4">

                <h5>Keranjang kosong</h5>

                <a
                    href="products.html"
                    class="btn btn-dark mt-2">

                    Belanja Sekarang

                </a>

            </div>
        `;

        return;

    }


    let subtotal = 0;

    let html = "";


    cart.forEach(item => {

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
                    src="${item.image}"
                    alt="${item.name}"
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
                        ${item.name}
                    </strong>

                    <br>

                    <small class="text-secondary">

                        Ukuran: ${item.size}
                        <br>
                        Qty: ${quantity}

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

        cart.forEach(item => {

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


    const shippingPriceElement =
        document.getElementById("shippingPrice");


    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            formatRupiah(subtotal);

    }


    if (shippingPriceElement) {

        shippingPriceElement.textContent =
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

    console.log("BAYAR DIKLIK");


    const cart = getCart();


    // --------------------------------------
    // CEK CART
    // --------------------------------------

    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong!"
        );

        return;

    }


    // --------------------------------------
    // AMBIL DATA
    // --------------------------------------

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


    if (
        !nameElement ||
        !phoneElement ||
        !addressElement ||
        !shippingElement ||
        !paymentElement
    ) {

        alert(
            "Data checkout tidak ditemukan. Cek checkout.html!"
        );

        return;

    }


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


    // --------------------------------------
    // VALIDASI
    // --------------------------------------

    if (!name) {

        alert("Nama lengkap belum diisi!");

        nameElement.focus();

        return;

    }


    if (!phone) {

        alert("Nomor HP belum diisi!");

        phoneElement.focus();

        return;

    }


    if (!address) {

        alert("Alamat belum diisi!");

        addressElement.focus();

        return;

    }


    if (!payment) {

        alert("Pilih metode pembayaran!");

        paymentElement.focus();

        return;

    }


    // --------------------------------------
    // HITUNG TOTAL
    // --------------------------------------

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const total =
        subtotal + shipping;


    // --------------------------------------
    // BUAT ORDER ID
    // --------------------------------------

    const orderId =
        "SH-" +
        Date.now();


    // --------------------------------------
    // BUAT DATA ORDER
    // --------------------------------------

    const order = {

        orderId: orderId,

        date:
            new Date().toLocaleString(
                "id-ID",
                {
                    dateStyle: "long",
                    timeStyle: "short"
                }
            ),

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


    // --------------------------------------
    // SIMPAN ORDER
    // --------------------------------------

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // --------------------------------------
    // KOSONGKAN CART
    // --------------------------------------

    localStorage.removeItem("cart");


    // --------------------------------------
    // LANGSUNG KE INVOICE
    // --------------------------------------

    window.location.href =
        "invoice.html";

}


// ==========================================
// LOAD HALAMAN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckout();


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

            payButton.onclick =
                createOrder;

        }

    }
);
