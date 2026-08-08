// ==========================================
// STYLEHUB - INVOICE
// ==========================================


// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(Number(number));

}


// ==========================================
// AMBIL DATA ORDER
// ==========================================

function getLastOrder() {

    try {

        return JSON.parse(
            localStorage.getItem("lastOrder")
        );

    } catch (error) {

        return null;

    }

}


// ==========================================
// TAMPILKAN INVOICE
// ==========================================

function displayInvoice() {

    const container =
        document.getElementById("invoiceContainer");


    if (!container) return;


    const order =
        getLastOrder();


    // ======================================
    // JIKA ORDER TIDAK ADA
    // ======================================

    if (!order) {

        container.innerHTML = `

            <div class="invoice-card text-center">

                <div class="mb-4"
                     style="font-size:70px;">

                    📄

                </div>

                <h2 class="fw-bold">
                    Invoice Tidak Ditemukan
                </h2>

                <p class="text-secondary">

                    Belum ada pesanan yang dibuat.

                </p>

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Kembali Belanja

                </a>

            </div>

        `;

        return;

    }


    // ======================================
    // DATA ORDER
    // ======================================

    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    let itemsHTML = "";


    items.forEach(item => {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        itemsHTML += `

            <div class="invoice-product">

                <img
                    src="${item.image}"
                    alt="${item.name}">

                <div class="invoice-product-info">

                    <div class="fw-bold">
                        ${item.name}
                    </div>

                    <div class="text-secondary small">

                        Ukuran: ${item.size || "-"}
                        &nbsp; • &nbsp;
                        Qty: ${quantity}

                    </div>

                    <div class="small mt-1">

                        ${formatRupiah(price)}
                        / item

                    </div>

                </div>

                <div class="fw-bold invoice-product-price">

                    ${formatRupiah(itemTotal)}

                </div>

            </div>

        `;

    });


    // ======================================
    // PEMBAYARAN
    // ======================================

    let paymentName =
        order.payment || "-";


    // Biar tampilan lebih enak dibaca

    const paymentNames = {

        cod: "COD",

        transfer: "Transfer Bank",

        qris: "QRIS",

        dana: "DANA",

        ovo: "OVO",

        gopay: "GoPay"

    };


    if (paymentNames[paymentName]) {

        paymentName =
            paymentNames[paymentName];

    }


    // ======================================
    // TAMPILKAN
    // ======================================

    container.innerHTML = `

        <div class="invoice-card">


            <!-- SUCCESS -->

            <div class="text-center mb-4">

                <div class="success-icon">

                    ✓

                </div>

                <h1 class="fw-bold mb-2">

                    Pembayaran Berhasil!

                </h1>

                <p class="text-secondary">

                    Terima kasih sudah berbelanja
                    di StyleHub.

                </p>

            </div>


            <hr>


            <!-- HEADER INVOICE -->

            <div class="invoice-header">

                <div>

                    <h3 class="fw-bold mb-1">

                        STYLE<span>HUB</span>

                    </h3>

                    <p class="text-secondary mb-0">

                        Fashion for Everyone

                    </p>

                </div>


                <div class="text-end">

                    <strong>
                        INVOICE
                    </strong>

                    <div class="small text-secondary">

                        ${order.orderId || "-"}

                    </div>

                    <div class="small text-secondary">

                        ${order.date || "-"}

                    </div>

                </div>

            </div>


            <hr>


            <!-- CUSTOMER -->

            <div class="invoice-customer mb-4">

                <h5 class="fw-bold mb-3">

                    Informasi Pembeli

                </h5>


                <div class="row">

                    <div class="col-md-6 mb-2">

                        <div class="text-secondary small">
                            Nama
                        </div>

                        <strong>
                            ${order.customer?.name || "-"}
                        </strong>

                    </div>


                    <div class="col-md-6 mb-2">

                        <div class="text-secondary small">
                            No. Telepon
                        </div>

                        <strong>
                            ${order.customer?.phone || "-"}
                        </strong>

                    </div>


                    <div class="col-12 mt-2">

                        <div class="text-secondary small">
                            Alamat
                        </div>

                        <strong>
                            ${order.customer?.address || "-"}
                        </strong>

                    </div>

                </div>

            </div>


            <hr>


            <!-- PRODUK -->

            <h5 class="fw-bold mb-3">

                Detail Pesanan

            </h5>


            <div class="invoice-products">

                ${itemsHTML}

            </div>


            <hr>


            <!-- RINGKASAN -->

            <div class="invoice-summary">

                <div class="d-flex justify-content-between mb-2">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ${formatRupiah(order.subtotal)}
                    </strong>

                </div>


                <div class="d-flex justify-content-between mb-2">

                    <span>
                        Ongkir
                    </span>

                    <strong>
                        ${formatRupiah(order.shipping)}
                    </strong>

                </div>


                <hr>


                <div class="d-flex justify-content-between fs-5">

                    <strong>
                        Total
                    </strong>

                    <strong>
                        ${formatRupiah(order.total)}
                    </strong>

                </div>

            </div>


            <div class="payment-info mt-4 p-3">

                <div class="text-secondary small">

                    Metode Pembayaran

                </div>

                <strong>

                    ${paymentName}

                </strong>

            </div>


            <!-- BUTTON -->

            <div class="invoice-buttons mt-4">

                <button
                    type="button"
                    onclick="window.print()"
                    class="btn btn-dark">

                    🖨️ Cetak Invoice

                </button>


                <a
                    href="index.html"
                    class="btn btn-outline-dark">

                    🏠 Kembali ke Home

                </a>

            </div>


        </div>

    `;

}


// ==========================================
// JALANKAN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    displayInvoice
);
