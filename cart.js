// ===================================
// STYLEHUB - CART SYSTEM
// ===================================


// ===================================
// AMBIL CART
// ===================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ===================================
// SIMPAN CART
// ===================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ===================================
// FORMAT RUPIAH
// ===================================

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


// ===================================
// TAMPILKAN CART
// ===================================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    if (!container) return;


    const cart = getCart();


    // ================================
    // CART KOSONG
    // ================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div
                style="
                    background:white;
                    padding:60px 20px;
                    border-radius:18px;
                    text-align:center;
                "
            >

                <div
                    style="
                        font-size:60px;
                        margin-bottom:15px;
                    "
                >
                    🛒
                </div>

                <h2 class="fw-bold">
                    Keranjang Kosong
                </h2>

                <p class="text-secondary">
                    Belum ada produk yang kamu pilih.
                </p>

                <a
                    href="products.html"
                    class="btn btn-dark mt-2"
                >
                    Mulai Belanja
                </a>

            </div>

        `;

        return;

    }


    let subtotal = 0;


    let html = `

        <div class="row g-4">

            <div class="col-lg-8">

    `;


    // ================================
    // PRODUK
    // ================================

    cart.forEach(item => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);


        subtotal += itemTotal;


        html += `

            <div
                style="
                    background:#fff;
                    border-radius:16px;
                    padding:15px;
                    margin-bottom:12px;
                    display:flex;
                    align-items:center;
                    gap:15px;
                    box-shadow:0 4px 15px rgba(0,0,0,.05);
                "
            >


                <!-- GAMBAR PRODUK -->

                <img

                    src="${item.image}"

                    alt="${item.name}"

                    style="
                        width:65px;
                        height:75px;
                        min-width:65px;
                        max-width:65px;
                        min-height:75px;
                        max-height:75px;
                        object-fit:contain;
                        background:#f3f3f3;
                        border-radius:9px;
                        display:block;
                    "

                >


                <!-- INFORMASI -->

                <div
                    style="
                        flex:1;
                        min-width:0;
                    "
                >

                    <h6
                        class="fw-bold mb-1"
                    >
                        ${item.name}
                    </h6>


                    <small
                        class="text-secondary"
                    >
                        Ukuran: ${item.size}
                    </small>


                    <div class="fw-bold mt-1">

                        ${formatRupiah(item.price)}

                    </div>


                    <!-- QUANTITY -->

                    <div
                        style="
                            display:inline-flex;
                            align-items:center;
                            border:1px solid #ddd;
                            border-radius:8px;
                            overflow:hidden;
                            margin-top:8px;
                        "
                    >

                        <button

                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    -1
                                )
                            "

                            style="
                                border:none;
                                background:#eee;
                                width:30px;
                                height:30px;
                            "

                        >
                            −
                        </button>


                        <span
                            style="
                                width:35px;
                                text-align:center;
                            "
                        >
                            ${item.quantity}
                        </span>


                        <button

                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    1
                                )
                            "

                            style="
                                border:none;
                                background:#eee;
                                width:30px;
                                height:30px;
                            "

                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- TOTAL PRODUK -->

                <div
                    style="
                        text-align:right;
                        min-width:100px;
                    "
                >

                    <strong>

                        ${formatRupiah(itemTotal)}

                    </strong>


                    <br>


                    <button

                        onclick="
                            removeCart(
                                ${item.id},
                                '${item.size}'
                            )
                        "

                        class="btn btn-sm btn-outline-danger mt-2"

                    >

                        Hapus

                    </button>

                </div>

            </div>

        `;

    });


    // ================================
    // SUMMARY
    // ================================

    const shipping = 15000;

    const total =
        subtotal +
        shipping;


    html += `

            </div>


            <div class="col-lg-4">

                <div
                    style="
                        background:#fff;
                        border-radius:16px;
                        padding:22px;
                        box-shadow:0 4px 15px rgba(0,0,0,.05);
                    "
                >

                    <h4 class="fw-bold">
                        Ringkasan Pesanan
                    </h4>


                    <hr>


                    <div
                        class="d-flex justify-content-between"
                    >

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ${formatRupiah(subtotal)}
                        </strong>

                    </div>


                    <div
                        class="d-flex justify-content-between mt-2"
                    >

                        <span>
                            Ongkir
                        </span>

                        <strong>
                            ${formatRupiah(shipping)}
                        </strong>

                    </div>


                    <hr>


                    <div
                        class="d-flex justify-content-between fs-5"
                    >

                        <strong>
                            Total
                        </strong>

                        <strong>
                            ${formatRupiah(total)}
                        </strong>

                    </div>


                    <a

                        href="checkout.html"

                        class="btn btn-dark w-100 mt-4"

                    >

                        Checkout

                    </a>

                </div>

            </div>

        </div>

    `;


    container.innerHTML =
        html;

}


// ===================================
// UBAH JUMLAH
// ===================================

function changeQuantity(
    id,
    size,
    change
) {

    let cart =
        getCart();


    const item =
        cart.find(
            product =>
                product.id === id &&
                product.size === size
        );


    if (!item) return;


    item.quantity =
        Number(item.quantity) +
        Number(change);


    // Jika jumlah menjadi 0,
    // produk dihapus dari cart.

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    !(
                        product.id === id &&
                        product.size === size
                    )
            );

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ===================================
// HAPUS PRODUK
// ===================================

function removeCart(
    id,
    size
) {

    let cart =
        getCart();


    cart =
        cart.filter(
            item =>
                !(
                    item.id === id &&
                    item.size === size
                )
        );


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ===================================
// UPDATE JUMLAH ICON CART
// ===================================

function updateCartCount() {

    const cart =
        getCart();


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.quantity),
            0
        );


    const badge =
        document.getElementById(
            "cartCount"
        );


    if (badge) {

        badge.textContent =
            total;

    }

}


// ===================================
// JALANKAN SAAT HALAMAN DIBUKA
// ===================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);
