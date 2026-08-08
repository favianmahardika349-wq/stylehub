// ===============================
// CART
// ===============================

function getCart() {

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}


// ===============================
// SIMPAN CART
// ===============================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ===============================
// RUPIAH
// ===============================

function rupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


// ===============================
// TAMPILKAN CART
// ===============================

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    if (!container) return;


    const cart = getCart();


    // CART KOSONG

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="text-center bg-white p-5 rounded-4">

                <div style="font-size:60px">
                    🛒
                </div>

                <h2 class="fw-bold mt-3">
                    Keranjang Kosong
                </h2>

                <p class="text-secondary">
                    Belum ada produk di keranjang.
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


    let subtotal = 0;


    let html = `

        <div class="row g-4">

            <div class="col-lg-8">

    `;


    // PRODUK

    cart.forEach(function(item) {

        const price =
            Number(item.price);

        const quantity =
            Number(item.quantity);

        const totalItem =
            price * quantity;


        subtotal += totalItem;


        html += `

            <div class="cart-product">


                <img
                    src="${item.image}"
                    class="cart-product-image"
                    alt="${item.name}"
                >


                <div class="cart-product-info">

                    <h6 class="fw-bold mb-1">

                        ${item.name}

                    </h6>


                    <small class="text-secondary">

                        Ukuran: ${item.size}

                    </small>


                    <div class="fw-bold mt-1">

                        ${rupiah(price)}

                    </div>


                    <div class="quantity-control mt-2">

                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    -1
                                )
                            ">

                            −

                        </button>


                        <span>

                            ${quantity}

                        </span>


                        <button
                            onclick="
                                changeQuantity(
                                    ${item.id},
                                    '${item.size}',
                                    1
                                )
                            ">

                            +

                        </button>

                    </div>

                </div>


                <div class="text-end">

                    <strong>

                        ${rupiah(totalItem)}

                    </strong>


                    <br>


                    <button
                        onclick="
                            removeCart(
                                ${item.id},
                                '${item.size}'
                            )
                        "
                        class="btn btn-sm btn-outline-danger mt-2">

                        Hapus

                    </button>

                </div>

            </div>

        `;

    });


    const shipping = 15000;

    const grandTotal =
        subtotal + shipping;


    // SUMMARY

    html += `

            </div>


            <div class="col-lg-4">

                <div class="summary-card">

                    <h4 class="fw-bold">
                        Ringkasan
                    </h4>

                    <hr>


                    <div class="d-flex justify-content-between">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ${rupiah(subtotal)}
                        </strong>

                    </div>


                    <div class="d-flex justify-content-between mt-2">

                        <span>
                            Ongkir
                        </span>

                        <strong>
                            ${rupiah(shipping)}
                        </strong>

                    </div>


                    <hr>


                    <div class="d-flex justify-content-between fs-5">

                        <strong>
                            Total
                        </strong>

                        <strong>
                            ${rupiah(grandTotal)}
                        </strong>

                    </div>


                    <a
                        href="checkout.html"
                        class="btn btn-dark w-100 mt-4">

                        Checkout

                    </a>

                </div>

            </div>

        </div>

    `;


    container.innerHTML = html;

}


// ===============================
// UBAH JUMLAH
// ===============================

function changeQuantity(
    id,
    size,
    change
) {

    let cart = getCart();


    const item = cart.find(function(item) {

        return Number(item.id) === Number(id)
            && item.size === size;

    });


    if (!item) return;


    item.quantity =
        Number(item.quantity) +
        Number(change);


    if (item.quantity <= 0) {

        cart = cart.filter(function(item) {

            return !(
                Number(item.id) === Number(id)
                && item.size === size
            );

        });

    }


    saveCart(cart);

    displayCart();

}


// ===============================
// HAPUS
// ===============================

function removeCart(
    id,
    size
) {

    let cart = getCart();


    cart = cart.filter(function(item) {

        return !(
            Number(item.id) === Number(id)
            && item.size === size
        );

    });


    saveCart(cart);

    displayCart();

}


// ===============================
// JALANKAN
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

    }
);
