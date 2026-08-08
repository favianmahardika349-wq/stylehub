const invoiceContainer =
    document.getElementById("invoice");


// ===============================
// AMBIL ORDER
// ===============================

const order =
    JSON.parse(
        localStorage.getItem("lastOrder")
    );


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
// CEK ORDER
// ===============================

if (!order) {

    invoiceContainer.innerHTML = `

        <div class="text-center py-5">

            <div style="font-size:70px;">
                😢
            </div>

            <h2 class="fw-bold">
                Invoice Tidak Ditemukan
            </h2>

            <p class="text-secondary">
                Belum ada pesanan.
            </p>

            <a
                href="products.html"
                class="btn btn-dark">

                Belanja Sekarang

            </a>

        </div>

    `;

}


// ===============================
// TAMPILKAN INVOICE
// ===============================

else {

    invoiceContainer.innerHTML = `

        <div class="invoice-card">

            <!-- SUCCESS -->

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


            <!-- NOMOR PESANAN -->

            <div class="row mb-4">

                <div class="col-md-6">

                    <small class="text-secondary">
                        Nomor Pesanan
                    </small>

                    <h5>
                        ${order.orderId}
                    </h5>

                </div>


                <div class="col-md-6">

                    <small class="text-secondary">
                        Tanggal
                    </small>

                    <h5>
                        ${order.date}
                    </h5>

                </div>

            </div>


            <!-- ALAMAT -->

            <h5 class="fw-bold">
                Informasi Pengiriman
            </h5>


            <p>
                <strong>
                    ${order.customer.name}
                </strong>
                <br>

                📱 ${order.customer.phone}
                <br>

                📍 ${order.customer.address}
            </p>


            <hr>


            <!-- PRODUK -->

            <h5 class="fw-bold mb-3">
                Detail Produk
            </h5>


            ${order.items.map(item => `

                <div class="invoice-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}">


                    <div class="flex-grow-1">

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        <small>

                            Ukuran:
                            ${item.size}

                            <br>

                            Jumlah:
                            ${item.quantity}

                        </small>

                    </div>


                    <strong>

                        ${rupiah(
                            item.price *
                            item.quantity
                        )}

                    </strong>

                </div>

            `).join("")}


            <hr>


            <!-- RINGKASAN -->

            <div class="d-flex justify-content-between">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${rupiah(
                        order.subtotal
                    )}
                </strong>

            </div>


            <div class="d-flex justify-content-between mt-2">

                <span>
                    Ongkir
                </span>

                <strong>
                    ${rupiah(
                        order.shipping
                    )}
                </strong>

            </div>


            <div class="d-flex justify-content-between mt-2">

                <span>
                    Pembayaran
                </span>

                <strong>
                    ${order.payment}
                </strong>

            </div>


            <hr>


            <div class="d-flex justify-content-between fs-4">

                <strong>
                    Total
                </strong>

                <strong>
                    ${rupiah(
                        order.total
                    )}
                </strong>

            </div>


            <!-- NOTIFIKASI -->

            <div class="alert alert-success mt-4">

                🔔

                <strong>
                    Pembayaran berhasil!
                </strong>

                <br>

                Pesanan
                <strong>
                    ${order.orderId}
                </strong>
                sedang diproses.

            </div>


            <!-- BUTTON -->

            <div class="text-center mt-4">

                <a
                    href="products.html"
                    class="btn btn-dark">

                    Belanja Lagi

                </a>


                <button
                    onclick="window.print()"
                    class="btn btn-outline-dark">

                    🖨️ Cetak Invoice

                </button>

            </div>

        </div>

    `;

}