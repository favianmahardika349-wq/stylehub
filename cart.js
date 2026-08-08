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


    const cart =
        getCart();


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="display-1">
                    🛒
                </div>

                <h2>
                    Keranjang Kosong
                </h2>

                <p class="text-secondary">
                    Belum ada produk yang kamu pilih.
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


    cart.forEach(item => {

        const itemTotal =
            item.price *
            item.quantity;


        subtotal += itemTotal;


        html += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}">


                <div class="cart-info">

                    <h5>
                        ${item.name}
                    </h5>

                    <p class="text-secondary">
                        Ukuran: ${item.size}
                    </p>

                    <strong>
                        ${formatRupiah(item.price)}
                    </strong>


                    <div class="quantity-control mt-2">

                        <button
                            onclick="changeQuantity(${item.id}, '${item.size}', -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, '${item.size}', 1)">
                            +
                        </button>

                    </div>

                </div>


                <div class="text-end">

                    <strong>
                        ${formatRupiah(itemTotal)}
                    </strong>

                    <br>

                    <button
                        onclick="removeCart(${item.id}, '${item.size}')"
                        class="btn btn-sm btn-outline-danger mt-2">

                        Hapus

                    </button>

                </div>

            </div>

        `;

    });


    html += `

            </div>


            <div class="col-lg-4">

                <div class="summary-card">

                    <h4>
                        Ringkasan
                    </h4>

                    <hr>

                    <div class="d-flex justify-content-between">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ${formatRupiah(subtotal)}
                        </strong>

                    </div>


                    <div class="d-flex justify-content-between mt-2">

                        <span>
                            Ongkir
                        </span>

                        <strong>
                            Rp15.000
                        </strong>

                    </div>


                    <hr>


                    <div class="d-flex justify-content-between fs-5">

                        <strong>
                            Total
                        </strong>

                        <strong>
                            ${formatRupiah(subtotal + 15000)}
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


    item.quantity +=
        change;


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

}


// ===================================
// HAPUS
// ===================================

function removeCart(id, size) {

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

}

