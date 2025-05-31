const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img" alt="${productTitle}">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement" aria-label="Decrease quantity">-</button>
                <span class="number">1</span>
                <button class="increment" aria-label="Increase quantity">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-fill cart-remove" aria-label="Remove item"></i>
    `;

    // Append the new cart box to the cart content
    cartContent.appendChild(cartBox);

    // Add event listeners for increment, decrement, and remove buttons
    cartBox.querySelector(".increment").addEventListener("click", () => {
        const quantityElement = cartBox.querySelector(".number");
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
        updateTotal();
    });

    cartBox.querySelector(".decrement").addEventListener("click", () => {
        const quantityElement = cartBox.querySelector(".number");
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            updateTotal();
        }
    });

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotal();
    });

    updateTotal();
    
};

const updateTotal = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const price = parseFloat(cartBox.querySelector(".cart-price").textContent.replace('$', ''));
        const quantity = parseInt(cartBox.querySelector(".number").textContent);
        total += price * quantity;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
};
