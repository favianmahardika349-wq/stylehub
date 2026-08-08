// ==========================================
// STYLEHUB - CART.JS
// ==========================================


// ==========================================
// AMBIL DATA CART DARI LOCAL STORAGE
// ==========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ==========================================
// SIMPAN CART
// ==========================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ==========================================
// FORMAT RUPIAH
// ==========================================

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


// ==========================================
// UPDATE JUMLAH CART DI NAVBAR
// ==========================================

function updateCartCount() {

    const cart = getCart();


    const total = cart.reduce(
        (sum, item) => {

            return sum +
                Number(item.quantity);

        },
        0
    );


    const badge =
        document.getElementById(
            "cartCount"
        );


    if (badge) {

        badge.textContent = total;

    }

}


// ==========================================
// TAMPILKAN CART
// ==========================================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );


    if (!container) return;


    const cart = getCart();


    // ======================================
    // CART KOSONG
    // ======================================

    if (cart.length === 0) {

        container.innerHTML = `

            <div
                class="empty-cart"
                style="
                    background:white;
                    padding:70px 20px;
                    border-radius:20px;
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

        updateCartCount();

        return;

    }


    // ======================================
    // HITUNG SUBTOTAL
    // ======================================

    let subtotal = 0;


    // ======================================
    // HTML AWAL
    // ======================================

    let html = `

        <div class="row g-4">


            <!-- ========================= -->
            <!-- DAFTAR PRODUK -->
            <!-- ========================= -->

            <div class="col-lg-8">

    `;


    // ======================================
    // LOOP PRODUK
    // ======================================

    cart.forEach(item => {


        const price =
            Number(item.price);


        const quantity =
            Number(item.quantity);


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        html += `

            <div class="cart-product">


                <!-- ===================== -->
                <!-- GAMBAR PRODUK -->
                <!-- ===================== -->

                <img

                    src="${item.image}"

                    alt="${item.name}"

                    class="cart-product-image"

                >


                <!-- ===================== -->
                <!-- INFORMASI PRODUK -->
                <!-- ===================== -->

                <div class="cart-product-info">


                    <h6 class="fw-bold mb-1">

                        ${item.name}

                    </h6>


                    <small
                        class="text-secondary"
                    >

                        Ukuran:
                        ${item.size}

                    </small>


                    <div class="fw-bold mt-1">

                        ${formatRupiah(price)}

                    </div>


                    <!-- ================= -->
                    <!-- JUMLAH PRODUK -->
                    <!-- ================= -->

                    <div
                        class="quantity-control mt-2"
                    >


                        <button

                            type="button"

                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    -1
                                )
                            "

                        >

                            −

                        </button>


                        <span>

                            ${quantity}

                        </span>


                        <button

                            type="button"

                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    1
                                )
                            "

                        >

                            +

                        </button>


                    </div>

                </div>


                <!-- ===================== -->
                <!-- TOTAL PRODUK -->
                <!-- ===================== -->

                <div class="text-end">


                    <strong>

                        ${formatRupiah(itemTotal)}

                    </strong>


                    <br>


                    <button

                        type="button"

                        onclick="
                            removeCart(
                                ${item.id},
                                '${item.size}'
                            )
                        "

                        class="
                            btn
                            btn-sm
                            btn-outline-danger
                            mt-2
                        "

                    >

                        Hapus

                    </button>


                </div>


            </div>

        `;

    });


    // ======================================
    // ONGKIR
    // ======================================

    const shipping = 15000;


    // ======================================
    // TOTAL
    // ======================================

    const total =
        subtotal + shipping;


    // ======================================
    // SUMMARY
    // ======================================

    html += `

            </div>


            <!-- ========================= -->
            <!-- RINGKASAN PESANAN -->
            <!-- ========================= -->

            <div class="col-lg-4">


                <div class="summary-card">


                    <h4 class="fw-bold">

                        Ringkasan Pesanan

                    </h4>


                    <hr>


                    <!-- SUBTOTAL -->

                    <div
                        class="
                            d-flex
                            justify-content-between
                        "
                    >

                        <span>

                            Subtotal

                        </span>


                        <strong>

                            ${formatRupiah(subtotal)}

                        </strong>

                    </div>


                    <!-- ONGKIR -->

                    <div
                        class="
                            d-flex
                            justify-content-between
                            mt-2
                        "
                    >

                        <span>

                            Ongkir

                        </span>


                        <strong>

                            ${formatRupiah(shipping)}

                        </strong>

                    </div>


                    <hr>


                    <!-- TOTAL -->

                    <div
                        class="
                            d-flex
                            justify-content-between
                            fs-5
                        "
                    >

                        <strong>

                            Total

                        </strong>


                        <strong>

                            ${formatRupiah(total)}

                        </strong>

                    </div>


                    <!-- CHECKOUT -->

                    <a

                        href="checkout.html"

                        class="
                            btn
                            btn-dark
                            w-100
                            mt-4
                        "

                    >

                        Checkout

                    </a>


                </div>


            </div>


        </div>

    `;


    // ======================================
    // MASUKKAN KE HTML
    // ======================================

    container.innerHTML = html;


    // ======================================
    // UPDATE BADGE CART
    // ======================================

    updateCartCount();

}


// ==========================================
// UBAH JUMLAH PRODUK
// ==========================================

function changeQuantity(
    id,
    size,
    change
) {


    let cart = getCart();


    // Cari produk berdasarkan ID + ukuran

    const item =
        cart.find(
            product =>

                Number(product.id) ===
                Number(id)

                &&

                product.size === size
        );


    if (!item) return;


    // Ubah jumlah

    item.quantity =
        Number(item.quantity) +
        Number(change);


    // ======================================
    // JIKA JUMLAH 0 → HAPUS PRODUK
    // ======================================

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>

                    !(
                        Number(product.id) ===
                        Number(id)

                        &&

                        product.size ===
                        size
                    )
            );

    }


    // Simpan

    saveCart(cart);


    // Tampilkan ulang

    displayCart();


    // Update badge

    updateCartCount();

}


// ==========================================
// HAPUS PRODUK
// ==========================================

function removeCart(
    id,
    size
) {


    let cart = getCart();


    cart =
        cart.filter(
            item =>

                !(
                    Number(item.id) ===
                    Number(id)

                    &&

                    item.size ===
                    size
                )
        );


    // Simpan cart baru

    saveCart(cart);


    // Tampilkan ulang

    displayCart();


    // Update badge

    updateCartCount();

}


// ==========================================
// JALANKAN SAAT HALAMAN SELESAI DIMUAT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);
