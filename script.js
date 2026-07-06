let cartCount = 0;

const cartButton = document.getElementById("cartButton");

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartButton.textContent = `🛒 Cart (${cartCount})`;

    });

});
