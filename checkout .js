// ==========================================
// STYLEHUB - CHECKOUT
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

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ==========================================
// TAMPILKAN RINGKASAN CHECKOUT
// ==========================================

function displayCheckout() {

    const cart = getCart();

    const container =
        document.getElementById("checkoutItems");

    const subtotalElement =
        document.getElementById("subtotal");

    const shippingElement =
        document.getElementById("shippingPrice");

    const totalElement =
        document.getElementById("total");


    if (!container) return;


    // Jika cart kosong

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center py-4">

                <h5>
                    Keranjang kosong
                </h5>

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

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


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
                        width:55px;
                        height:65px;
                        object-fit:contain;
                        background:#f3f3f3;
                        border-radius:8px;
                    "
                >

                <div class="flex-grow-1">

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small class="text-secondary">

                        Ukuran: ${item.size}
                        |
                        Qty: ${item.quantity}

                    </small>

                </div>

                <strong>

                    ${formatRupiah(itemTotal)}

                </strong>

            </div>

        `;

    });


    container.innerHTML = html;


    const shippingSelect =
        document.getElementById("shipping");


    const shipping =
        shippingSelect
            ? Number(shippingSelect.value)
            : 15000;


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        formatRupiah(subtotal);


    shippingElement.textContent =
        formatRupiah(shipping);


    totalElement.textContent =
        formatRupiah(total);

}


// ==========================================
// UPDATE ONGKIR
// ==========================================

function updateShipping() {

    const cart = getCart();


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const shippingSelect =
        document.getElementById("shipping");


    const shipping =
        shippingSelect
            ? Number(shippingSelect.value)
            : 15000;


    const total =
        subtotal + shipping;


    const shippingElement =
        document.getElementById("shippingPrice");


    const totalElement =
        document.getElementById("total");


    if (shippingElement) {

        shippingElement.textContent =
            formatRupiah(shipping);

    }


    if (totalElement) {

        totalElement.textContent =
            formatRupiah(total);

    }

}


// ==========================================
// BUAT PESANAN
// ==========================================

function createOrder(event) {

    event.preventDefault();


    const cart = getCart();


    // Jangan lanjut jika cart kosong

    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong!"
        );

        return;

    }


    // ======================================
    // AMBIL DATA CUSTOMER
    // ======================================

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    const shippingElement =
        document.getElementById(
            "shipping"
        );


    const paymentElement =
        document.getElementById(
            "payment"
        );


    const shipping =
        Number(
            shippingElement.value
        );


    const payment =
        paymentElement.value;


    // ======================================
    // VALIDASI
    // ======================================

    if (
        !name ||
        !phone ||
        !address ||
        !payment
    ) {

        alert(
            "Mohon lengkapi semua data checkout!"
        );

        return;

    }


    // ======================================
    // HITUNG SUBTOTAL
    // ======================================

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const total =
        subtotal + shipping;


    // ======================================
    // BUAT NOMOR ORDER
    // ======================================

    const orderId =
        "SH-" +
        Date.now();


    // ======================================
    // BUAT TANGGAL
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
    // OBJECT ORDER
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

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // ======================================
    // KOSONGKAN CART
    // ======================================

    localStorage.removeItem("cart");


    // ======================================
    // PINDAH KE INVOICE
    // ======================================

    window.location.href =
        "invoice.html";

}


// ==========================================
// SAAT HALAMAN SELESAI DIMUAT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Tampilkan checkout

        displayCheckout();


        // Form checkout

        const form =
            document.getElementById(
                "checkoutForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                createOrder
            );

        }


        // Perubahan kurir

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

    }
);
