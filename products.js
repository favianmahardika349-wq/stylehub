// ======================================
// STYLEHUB - PRODUCT SYSTEM
// ======================================


// ======================================
// DATA PRODUK
// ======================================

const products = [

    {
        id: 1,
        name: "Basic Oversized T-Shirt",
        category: "T-Shirt",
        price: 129000,
        color: "Black",
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
        rating: 4.8
    },

    {
        id: 2,
        name: "Premium White T-Shirt",
        category: "T-Shirt",
        price: 149000,
        color: "White",
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4036?w=600&q=80",
        rating: 4.9
    },

    {
        id: 3,
        name: "Oversized Hoodie Black",
        category: "Hoodie",
        price: 299000,
        color: "Black",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
        rating: 4.8
    },

    {
        id: 4,
        name: "Classic Denim Shirt",
        category: "Kemeja",
        price: 249000,
        color: "Blue",
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
        rating: 4.7
    },

    {
        id: 5,
        name: "Cargo Pants Black",
        category: "Celana",
        price: 279000,
        color: "Black",
        sizes: ["28", "30", "32", "34"],
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
        rating: 4.6
    },

    {
        id: 6,
        name: "Flannel Overshirt",
        category: "Kemeja",
        price: 219000,
        color: "Red",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80",
        rating: 4.7
    },

    {
        id: 7,
        name: "Grey Essential Hoodie",
        category: "Hoodie",
        price: 319000,
        color: "Grey",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
        rating: 4.9
    },

    {
        id: 8,
        name: "Straight Fit Pants",
        category: "Celana",
        price: 259000,
        color: "Beige",
        sizes: ["28", "30", "32", "34"],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
        rating: 4.5
    }

];


// ======================================
// FORMAT RUPIAH
// ======================================

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(number);

}


// ======================================
// PRODUCT CARD
// ======================================

function productCard(product) {

    return `

        <div class="col-12 col-sm-6 col-lg-3">

            <div class="product-card">

                <a href="detail.html?id=${product.id}">

                    <img
                        src="${product.image}"
                        alt="${product.name}"

                        style="
                            width:100%;
                            height:200px;
                            object-fit:contain;
                            display:block;
                            background:#f3f3f3;
                            border-radius:12px;
                        "

                    >

                </a>


                <div class="product-body">

                    <span class="badge bg-light text-dark">

                        ${product.category}

                    </span>


                    <h5 class="mt-2">

                        ${product.name}

                    </h5>


                    <div class="rating">

                        ⭐ ${product.rating}

                    </div>


                    <h5 class="fw-bold mt-2">

                        ${formatRupiah(product.price)}

                    </h5>


                    <a
                        href="detail.html?id=${product.id}"
                        class="btn btn-dark w-100">

                        Lihat Detail

                    </a>

                </div>

            </div>

        </div>

    `;

}


// ======================================
// FEATURED PRODUCTS
// ======================================

function displayFeaturedProducts() {

    const container =
        document.getElementById(
            "featuredProducts"
        );

    if (!container) return;


    container.innerHTML =
        products
            .slice(0, 4)
            .map(productCard)
            .join("");

}


// ======================================
// DISPLAY ALL PRODUCTS
// ======================================

function displayProducts() {

    const container =
        document.getElementById(
            "productList"
        );

    if (!container) return;


    container.innerHTML =
        products
            .map(productCard)
            .join("");


    checkCategoryFromURL();

}


// ======================================
// FILTER PRODUCTS
// ======================================

function filterProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    const search =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const sort =
        sortFilter
            ? sortFilter.value
            : "";


    let result =
        products.filter(product => {

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchCategory =
                category === "all" ||
                product.category === category;


            return (
                matchSearch &&
                matchCategory
            );

        });


    // Termurah
    if (sort === "low") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    // Termahal
    if (sort === "high") {

        result.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    const container =
        document.getElementById(
            "productList"
        );


    if (!container) return;


    if (result.length > 0) {

        container.innerHTML =
            result
                .map(productCard)
                .join("");

    } else {

        container.innerHTML = `

            <div class="col-12 text-center py-5">

                <h3>

                    Produk tidak ditemukan 😢

                </h3>

                <p class="text-secondary">

                    Coba kata kunci lain.

                </p>

            </div>

        `;

    }

}


// ======================================
// CATEGORY FROM URL
// ======================================

function checkCategoryFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get("category");


    if (!category) return;


    const select =
        document.getElementById(
            "categoryFilter"
        );


    if (select) {

        select.value =
            category;

        filterProducts();

    }

}


// ======================================
// PRODUCT DETAIL
// ======================================

function displayProductDetail() {

    const container =
        document.getElementById(
            "productDetail"
        );

    if (!container) return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(
            params.get("id")
        );


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        container.innerHTML = `

            <div class="text-center py-5">

                <h2>

                    Produk tidak ditemukan 😢

                </h2>

                <a
                    href="products.html"
                    class="btn btn-dark mt-3">

                    Kembali ke Produk

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="row g-5 align-items-center">


            <!-- GAMBAR PRODUK -->

            <div class="col-lg-6 text-center">

                <img

                    src="${product.image}"

                    alt="${product.name}"

                    style="
                        width:350px;
                        height:400px;
                        max-width:100%;
                        object-fit:contain;
                        display:block;
                        margin:auto;
                        background:#f3f3f3;
                        border-radius:18px;
                    "

                >

            </div>


            <!-- INFORMASI PRODUK -->

            <div class="col-lg-6">

                <span class="badge bg-dark">

                    ${product.category}

                </span>


                <h1 class="fw-bold mt-3">

                    ${product.name}

                </h1>


                <div class="rating mb-3">

                    ⭐ ${product.rating}

                </div>


                <h2 class="fw-bold">

                    ${formatRupiah(product.price)}

                </h2>


                <p class="text-secondary mt-3">

                    Produk berkualitas dengan bahan
                    nyaman dan desain modern.
                    Cocok digunakan sehari-hari.

                </p>


                <div class="mb-3">

                    <label class="form-label fw-bold">

                        Pilih Ukuran

                    </label>


                    <select
                        id="productSize"
                        class="form-select">

                        ${product.sizes
                            .map(
                                size =>

                                `<option value="${size}">
                                    ${size}
                                </option>`

                            )
                            .join("")}

                    </select>

                </div>


                <div class="mb-4">

                    <label class="form-label fw-bold">

                        Jumlah

                    </label>


                    <input

                        id="productQuantity"

                        type="number"

                        min="1"

                        value="1"

                        class="form-control"

                    >

                </div>


                <button

                    onclick="addProductToCart(${product.id})"

                    class="btn btn-dark btn-lg w-100">

                    🛒 Tambahkan ke Keranjang

                </button>

            </div>

        </div>

    `;

}


// ======================================
// ADD TO CART
// ======================================

function addProductToCart(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    const sizeElement =
        document.getElementById(
            "productSize"
        );


    const quantityElement =
        document.getElementById(
            "productQuantity"
        );


    const size =
        sizeElement
            ? sizeElement.value
            : product.sizes[0];


    const quantity =
        quantityElement
            ? Math.max(
                1,
                Number(
                    quantityElement.value
                )
            )
            : 1;


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existing =
        cart.find(
            item =>
                item.id === id &&
                item.size === size
        );


    if (existing) {

        existing.quantity +=
            quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            size: size,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        "Produk berhasil masuk ke keranjang! 🛒"
    );

}


// ======================================
// CART COUNT
// ======================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const total =
        cart.reduce(

            (sum, item) =>

                sum +
                Number(
                    item.quantity
                ),

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


// ======================================
// AUTO RUN
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayFeaturedProducts();

        displayProducts();

        displayProductDetail();

        updateCartCount();

    }
);
