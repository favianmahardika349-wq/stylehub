// ==========================================
// STYLEHUB - CHECKOUT
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
// TAMPILKAN PRODUK CHECKOUT
// ==========================================

function displayCheckout() {

    const cart = getCart();

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;


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


    updateTotal();

}


// ==========================================
// HITUNG TOTAL
// ==========================================

function updateTotal() {

    const cart = getCart();

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const shippingElement =
        document.getElementById("shipping");


    const shipping =
        shippingElement
            ? Number(shippingElement.value)
            : 15000;


    const total =
        subtotal + shipping;


    const subtotalElement =
        document.getElementById("subtotal");


    const shippingPrice =
        document.getElementById("shippingPrice");


    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            formatRupiah(subtotal);

    }


    if (shippingPrice) {

        shippingPrice.textContent =
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

    // Mencegah halaman refresh

    event.preventDefault();


    console.log("CREATE ORDER DIPANGGIL");


    const cart = getCart();


    if (cart.length === 0) {

        alert("Keranjang kamu masih kosong!");

        return;

    }


    // ======================================
    // DATA CUSTOMER
    // ======================================

    const name =
        document.getElementById("customerName").value.trim();


    const phone =
        document.getElementById("customerPhone").value.trim();


    const address =
        document.getElementById("customerAddress").value.trim();


    const shippingElement =
        document.getElementById("shipping");


    const paymentElement =
        document.getElementById("payment");


    if (!shippingElement || !paymentElement) {

        alert(
            "Elemen pembayaran atau kurir tidak ditemukan!"
        );

        return;

    }


    const shipping =
        Number(shippingElement.value);


    const payment =
        paymentElement.value;


    // ======================================
    // VALIDASI
    // ======================================

    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        payment === ""
    ) {

        alert(
            "Mohon lengkapi semua data checkout!"
        );

        return;

    }


    // ======================================
    // SUBTOTAL
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
    // SIMPAN INVOICE
    // ======================================

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // ======================================
    // CEK APAKAH TERSIMPAN
    // ======================================

    const savedOrder =
        localStorage.getItem("lastOrder");


    if (!savedOrder) {

        alert(
            "Pesanan gagal disimpan!"
        );

        return;

    }


    // ======================================
    // HAPUS CART
    // ======================================

    localStorage.removeItem("cart");


    // ======================================
    // PINDAH KE INVOICE
    // ======================================

    window.location.href ="invoice.html";

}


// ==========================================
// SAAT HALAMAN DIBUKA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckout();

        const shipping =
            document.getElementById("shipping");


        if (shipping) {

            shipping.addEventListener(
                "change",
                updateTotal
            );

        }

    }
);
