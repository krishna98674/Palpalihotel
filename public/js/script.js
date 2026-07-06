let cartCount = 0;

const cartButton = document.getElementById("cartButton");
const orderButtons = document.querySelectorAll(".order-btn");

const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartBody = document.getElementById("cartBody");

let cartItems = [];

// Add item to cart
orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        const itemName = button.dataset.name;
        const itemPrice = Number(button.dataset.price);

        cartItems.push({
            name: itemName,
            price: itemPrice
        });

        cartCount++;

        cartButton.textContent = `🛒 Cart (${cartCount})`;

        renderCart();

    });

});

// Display cart items
function renderCart() {

    cartBody.innerHTML = "";

    let total = 0;

    if (cartItems.length === 0) {

        cartBody.innerHTML = "<p>Your cart is empty.</p>";

        document.getElementById("totalPrice").textContent = "Total: Rs. 0";

        return;

    }

    cartItems.forEach((item, index) => {

        total += item.price;

        cartBody.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>Rs. ${item.price}</p>

            </div>

            <button class="remove-btn" onclick="removeItem(${index})">
                ❌
            </button>

        </div>

        `;

    });

    document.getElementById("totalPrice").textContent =
        `Total: Rs. ${total}`;

}

// Remove item
function removeItem(index) {

    cartItems.splice(index, 1);

    cartCount--;

    if (cartCount < 0) {
        cartCount = 0;
    }

    cartButton.textContent = `🛒 Cart (${cartCount})`;

    renderCart();

}

// Open cart
cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");

});

// Close cart
closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

});
