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
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        rating: 4.8
    },

    {
        id: 2,
        name: "Premium White T-Shirt",
        category: "T-Shirt",
        price: 149000,
        color: "White",
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f4036",
        rating: 4.9
    },

    {
        id: 3,
        name: "Oversized Hoodie Black",
        category: "Hoodie",
        price: 299000,
        color: "Black",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        rating: 4.8
    },

    {
        id: 4,
        name: "Classic Denim Shirt",
        category: "Kemeja",
        price: 249000,
        color: "Blue",
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        rating: 4.7
    },

    {
        id: 5,
        name: "Cargo Pants Black",
        category: "Celana",
        price: 279000,
        color: "Black",
        sizes: ["28", "30", "32", "34"],
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        rating: 4.6
    },

    {
        id: 6,
        name: "Flannel Overshirt",
        category: "Kemeja",
        price: 219000,
        color: "Red",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
        rating: 4.7
    },

    {
        id: 7,
        name: "Grey Essential Hoodie",
        category: "Hoodie",
        price: 319000,
        color: "Grey",
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5",
        rating: 4.9
    },

    {
        id: 8,
        name: "Straight Fit Pants",
        category: "Celana",
        price: 259000,
        color: "Beige",
        sizes: ["28", "30", "32", "34"],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
        rating: 4.5
    }

];


// ======================================
// FORMAT RUPIAH
// ======================================

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


// ======================================
// CARD PRODUK
// ======================================

function productCard(product) {

    return `

        <div class="col-12 col-sm-6 col-lg-3">

            <div class="product-card">

                <a href="detail.html?id=${product.id}">

                    <img
                        src="${product.image}"
                        class="product-image"
                        alt="${product.name}">

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
// FEATURED
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
// SEMUA PRODUK
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
// FILTER
// ======================================

function filterProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const category =
        document
        .getElementById("categoryFilter")
        .value;


    const sort =
        document
        .getElementById("sortFilter")
        .value;


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


    if (sort === "low") {

        result.sort(
            (a, b) =>
                a.price - b.price
        );

    }


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


    container.innerHTML =
        result.length

        ? result.map(productCard).join("")

        : `

            <div class="col-12 text-center py-5">

                <h3>
                    Produk tidak ditemukan 😢
                </h3>

                <p>
                    Coba kata kunci lain.
                </p>

            </div>

        `;

}


// ======================================
// CATEGORY DARI URL
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
// DETAIL PRODUK
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
        Number(params.get("id"));


    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {

        container.innerHTML = `
            <h2>
                Produk tidak ditemukan
            </h2>
        `;

        return;

    }


    container.innerHTML = `

        <div class="row g-5 align-items-center">

            <div class="col-lg-6">

                <img
                    src="${product.image}"
                    class="detail-image"
                    alt="${product.name}">

            </div>


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
                                    `<option>${size}</option>`
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
                        class="form-control">

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
// TAMBAH PRODUK KE CART
// ======================================

function addProductToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    const size =
        document.getElementById(
            "productSize"
        ).value;


    const quantity =
        Number(
            document.getElementById(
                "productQuantity"
            ).value
        );


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

        existing.quantity += quantity;

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
        "Produk berhasil masuk ke keranjang!"
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
                sum + item.quantity,
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