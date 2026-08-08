// ==========================================
// STYLEHUB CHECKOUT - FIX
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
// TAMPILKAN CHECKOUT
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
                    class="btn btn-dark">
                    Belanja Sekarang
                </a>

            </div>
        `;

        return;
    }


    let subtotal = 0;

    let html = "";


    cart.forEach(item => {

        const price =
            Number(item.price);

        const quantity =
            Number(item.quantity);

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        html += `
            <div class="d-flex align-items-center gap-3 mb-3">

                <img
                    src="${item.image}"
                    style="
                        width:60px;
                        height:70px;
                        object-fit:cover;
                        border-radius:8px;
                    ">

                <div class="flex-grow-1">

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small class="text-secondary">
                        Ukuran: ${item.size}
                        × ${quantity}
                    </small>

                </div>

                <strong>
                    ${formatRupiah(itemTotal)}
                </strong>

            </div>
        `;

    });


    container.innerHTML = html;


    const shipping =
        Number(
            document.getElementById("shipping")?.value
        ) || 15000;


    document.getElementById("subtotal")
        .textContent =
        formatRupiah(subtotal);


    document.getElementById("shippingPrice")
        .textContent =
        formatRupiah(shipping);


    document.getElementById("total")
        .textContent =
        formatRupiah(
            subtotal + shipping
        );

}


// ==========================================
// UPDATE ONGKIR
// ==========================================

function updateShipping() {

    const cart = getCart();

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const shipping =
        Number(
            document.getElementById("shipping").value
        ) || 15000;


    document.getElementById("shippingPrice")
        .textContent =
        formatRupiah(shipping);


    document.getElementById("total")
        .textContent =
        formatRupiah(
            subtotal + shipping
        );

}


// ==========================================
// BUAT PESANAN
// ==========================================

function createOrder(event) {

    event.preventDefault();

    console.log("CREATE ORDER BERJALAN");


    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong!"
        );

        return;

    }


    const name =
        document
        .getElementById("customerName")
        .value
        .trim();


    const phone =
        document
        .getElementById("customerPhone")
        .value
        .trim();


    const address =
        document
        .getElementById("customerAddress")
        .value
        .trim();


    const shipping =
        Number(
            document
            .getElementById("shipping")
            .value
        );


    const payment =
        document
        .getElementById("payment")
        .value;


    if (
        !name ||
        !phone ||
        !address ||
        !payment
    ) {

        alert(
            "Mohon lengkapi semua data checkout!"
        );

        return;

    }


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity);

    });


    const total =
        subtotal + shipping;


    const order = {

        orderId:
            "SH-" +
            Date.now(),

        date:
            new Date().toLocaleString(
                "id-ID"
            ),

        customer: {

            name:
                name,

            phone:
                phone,

            address:
                address

        },

        items:
            cart,

        subtotal:
            subtotal,

        shipping:
            shipping,

        payment:
            payment,

        total:
            total

    };


    // SIMPAN INVOICE
    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    // HAPUS CART
    localStorage.removeItem("cart");


    // REDIRECT
    window.location.assign(
        "invoice.html"
    );

}


// ==========================================
// LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCheckout();


        const form =
            document.getElementById(
                "checkoutForm"
            );


        if (form) {

            form.addEventListener(
                "submit",
                createOrder
            );

        }


        const shipping =
            document.getElementById(
                "shipping"
            );


        if (shipping) {

            shipping.addEventListener(
                "change",
                updateShipping
            );

        }

    }
);
