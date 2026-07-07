// =======================================
// PALPALI HOTEL
// SHOPPING CART SYSTEM
// =======================================

// Cart Data
async function loadFoods(){

    const response = await fetch("/api/foods");

    const foods = await response.json();

    const container = document.getElementById("foodContainer");

    if(!container){

        return;

    }

    container.innerHTML = "";

    foods.forEach(food=>{

        container.innerHTML += `

        <div class="food-card">

            <div class="food-image">

                🍽️

            </div>

            <h3>

                ${food.food_name}

            </h3>

            <p>

                ${food.description}

            </p>

            <div class="price">

                Rs. ${food.price}

            </div>

            <button

                class="order-btn"

                data-name="${food.food_name}"

                data-price="${food.price}">

                Order Now

            </button>

        </div>

        `;

    });

registerOrderButtons();

updateCartButton();

renderCart();

}
let cartItems = [];

// Total Quantity
let cartCount = 0;

// HTML Elements
const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartBody = document.getElementById("cartBody");
const totalPrice = document.getElementById("totalPrice");

function registerOrderButtons(){

    const orderButtons=document.querySelectorAll(".order-btn");

    orderButtons.forEach(button=>{

        button.onclick=()=>{

            const itemName=button.dataset.name;

            const itemPrice=Number(button.dataset.price);

            const existingItem=cartItems.find(

                item=>item.name===itemName

            );

            if(existingItem){

                existingItem.quantity++;

            }

            else{

                cartItems.push({

                    name:itemName,

                    price:itemPrice,

                    quantity:1

                });

            }

            cartCount++;

            updateCartButton();

            renderCart();

            saveCart();

        };

    });

}

// =======================================
// UPDATE CART BUTTON
// =======================================

function updateCartButton(){

    cartButton.textContent = `🛒 Cart (${cartCount})`;

}

// =======================================
// OPEN CART
// =======================================

cartButton.addEventListener("click",()=>{

    cartSidebar.classList.add("active");

});

// =======================================
// CLOSE CART
// =======================================

closeCart.addEventListener("click",()=>{

    cartSidebar.classList.remove("active");

});

// =======================================
// RENDER CART
// =======================================

function renderCart(){

    cartBody.innerHTML="";

    if(cartItems.length===0){

        cartBody.innerHTML="<p>Your cart is empty.</p>";

        totalPrice.textContent="Total : Rs. 0";

        return;

    }

    let grandTotal=0;

    cartItems.forEach((item,index)=>{

        const subtotal=item.price*item.quantity;

        grandTotal+=subtotal;

        cartBody.innerHTML+=`

        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>Rs. ${item.price}</p>

                <div class="quantity-controls">

                    <button class="qty-btn" onclick="decreaseQuantity(${index})">

                    -

                    </button>

                    <span class="quantity">

                    ${item.quantity}

                    </span>

                    <button class="qty-btn" onclick="increaseQuantity(${index})">

                    +

                    </button>

                </div>

                <p>

                <strong>

                Rs. ${subtotal}

                </strong>

                </p>

            </div>

            <button

            class="remove-btn"

            onclick="removeItem(${index})">

            ❌

            </button>

        </div>

        `;

    });

    totalPrice.textContent=`Total : Rs. ${grandTotal}`;

}
// =======================================
// INCREASE QUANTITY
// =======================================

function increaseQuantity(index){

    cartItems[index].quantity++;

    cartCount++;

    updateCartButton();

    renderCart();

    saveCart();

}

// =======================================
// DECREASE QUANTITY
// =======================================

function decreaseQuantity(index){

    cartItems[index].quantity--;

    cartCount--;

    if(cartItems[index].quantity<=0){

        cartItems.splice(index,1);

    }

    updateCartButton();

    renderCart();

    saveCart();

}

// =======================================
// REMOVE ITEM
// =======================================

function removeItem(index){

    cartCount -= cartItems[index].quantity;

    cartItems.splice(index,1);

    updateCartButton();

    renderCart();

    saveCart();

}

// =======================================
// SAVE CART
// =======================================

function saveCart(){

    localStorage.setItem(

        "palpaliCart",

        JSON.stringify(cartItems)

    );

}

// =======================================
// LOAD CART
// =======================================

function loadCart(){

    const savedCart = localStorage.getItem("palpaliCart");

    if(savedCart){

        cartItems = JSON.parse(savedCart);

        cartCount = 0;

        cartItems.forEach(item=>{

            cartCount += item.quantity;

        });

        updateCartButton();

        renderCart();

    }

}

loadCart();

// =======================================
// CHECKOUT
// =======================================
const checkoutButton = document.querySelector(".checkout-btn");
checkoutButton.addEventListener("click", async () => {
alert("Order Created ");
    if (cartItems.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const customerName = prompt("Enter Your Name");

    if (!customerName) {

        return;

    }

    let total = 0;

    cartItems.forEach(item => {

        total += item.price * item.quantity;

    });

    const orderData = {

        customer_name: customerName,

        total_amount: total,

        items: cartItems

    };

    try {

        const response = await fetch("/api/orders", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(orderData)

        });

        const result = await response.json();

        alert(result.message);

        cartItems = [];

        cartCount = 0;

        updateCartButton();

        renderCart();

        saveCart();

    } catch (error) {

        console.log(error);

        alert("Order Failed!");

    }

});

// =======================================
// RESERVATION FORM
// =======================================


const reservationForm = document.getElementById("reservationForm");

reservationForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const reservationData = {

        customer_name: document.getElementById("customerName").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        reservation_date: document.getElementById("reservationDate").value,

        reservation_time: document.getElementById("reservationTime").value,

        guests: document.getElementById("guests").value

    };

    try {

        const response = await fetch("/api/reservations", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(reservationData)

        });

        const result = await response.json();

        alert(result.message);

        reservationForm.reset();

    } catch (error) {

        console.error(error);

        alert("Something went wrong!");

    }

});
loadFoods();
