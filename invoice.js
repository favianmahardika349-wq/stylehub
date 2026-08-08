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

    }).format(Number(number) || 0);

}


// ==========================================
// LOAD INVOICE
// ==========================================

function loadInvoice() {

    const invoice =
        document.getElementById("invoice");


    if (!invoice) {

        return;

    }


    // Ambil pesanan terakhir

    const savedOrder =
        localStorage.getItem("lastOrder");


    // ======================================
    // JIKA BELUM ADA PESANAN
    // ======================================

    if (!savedOrder) {

        invoice.innerHTML = `

            <div class="invoice-card text-center">

                <div style="font-size:70px;">
                    📄
                </div>

                <h2 class="fw-bold mt-3">
                    Invoice Tidak Ditemukan
                </h2>

                <p class="text-secondary">
                    Belum ada pesanan yang dibuat.
                </p>

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Mulai Belanja

                </a>

            </div>

        `;

        return;

    }


    // ======================================
    // BACA DATA ORDER
    // ======================================

    let order;


    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Invoice error:",
            error
        );


        invoice.innerHTML = `

            <div class="invoice-card text-center">

                <h2 class="fw-bold">
                    Data Invoice Rusak
                </h2>

                <p class="text-secondary">
                    Silakan buat pesanan baru.
                </p>

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Belanja Lagi

                </a>

            </div>

        `;

        return;

    }


    // ======================================
    // DATA CUSTOMER
    // ======================================

    const customer =
        order.customer || {};


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    // ======================================
    // PRODUK
    // ======================================

    let productsHTML = "";


    items.forEach(function(item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const itemTotal =
            price * quantity;


        productsHTML += `

            <div class="invoice-product">

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Produk"}">

                <div class="invoice-product-info">

                    <strong>
                        ${item.name || "Produk"}
                    </strong>

                    <div class="text-secondary small">

                        Ukuran:
                        ${item.size || "-"}

                        <br>

                        Jumlah:
                        ${quantity}

                    </div>

                    <div class="small mt-1">

                        ${formatRupiah(price)}
                        / item

                    </div>

                </div>


                <strong class="invoice-price">

                    ${formatRupiah(itemTotal)}

                </strong>

            </div>

        `;

    });


    // ======================================
    // TAMPILKAN INVOICE
    // ======================================

    invoice.innerHTML = `

        <div class="invoice-card">


            <!-- STATUS -->

            <div class="text-center">

                <div class="success-icon">

                    ✓

                </div>


                <h1 class="fw-bold">

                    Pesanan Berhasil!

                </h1>


                <p class="text-secondary">

                    Terima kasih telah berbelanja
                    di StyleHub.

                </p>

            </div>


            <hr>


            <!-- INFO ORDER -->

            <div class="row mb-4">

                <div class="col-md-6 mb-3">

                    <small class="text-secondary">
                        Nomor Pesanan
                    </small>

                    <h5 class="fw-bold">

                        ${order.orderId || "-"}

                    </h5>

                </div>


                <div class="col-md-6 mb-3">

                    <small class="text-secondary">
                        Tanggal
                    </small>

                    <h5 class="fw-bold">

                        ${order.date || "-"}

                    </h5>

                </div>

            </div>


            <hr>


            <!-- CUSTOMER -->

            <h5 class="fw-bold mb-3">

                Informasi Pengiriman

            </h5>


            <div class="mb-2">

                <strong>
                    ${customer.name || "-"}
                </strong>

            </div>


            <div class="mb-2">

                📱
                ${customer.phone || "-"}

            </div>


            <div class="mb-4">

                📍
                ${customer.address || "-"}

            </div>


            <hr>


            <!-- PRODUK -->

            <h5 class="fw-bold mb-3">

                Detail Produk

            </h5>


            <div>

                ${productsHTML}

            </div>


            <hr>


            <!-- TOTAL -->

            <div class="d-flex justify-content-between mb-2">

                <span>
                    Subtotal
                </span>

                <strong>

                    ${formatRupiah(
                        order.subtotal
                    )}

                </strong>

            </div>


            <div class="d-flex justify-content-between mb-2">

                <span>
                    Ongkir
                </span>

                <strong>

                    ${formatRupiah(
                        order.shipping
                    )}

                </strong>

            </div>


            <div class="d-flex justify-content-between mb-2">

                <span>
                    Pembayaran
                </span>

                <strong>

                    ${order.payment || "-"}

                </strong>

            </div>


            <hr>


            <div class="d-flex justify-content-between fs-4">

                <strong>
                    Total
                </strong>

                <strong>

                    ${formatRupiah(
                        order.total
                    )}

                </strong>

            </div>


            <!-- STATUS -->

            <div class="alert alert-success mt-4">

                <strong>
                    ✓ Pembayaran berhasil!
                </strong>

                <br>

                Pesanan
                <strong>
                    ${order.orderId || "-"}
                </strong>

                sedang diproses.

            </div>


            <!-- BUTTON -->

            <div class="d-flex gap-2 flex-wrap mt-4">

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Belanja Lagi

                </a>


                <button
                    type="button"
                    onclick="window.print()"
                    class="btn btn-outline-dark">

                    🖨️ Cetak Invoice

                </button>

            </div>


        </div>

    `;

}


// ==========================================
// JALANKAN SAAT HALAMAN DIBUKA
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadInvoice
);
