// cart.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cart page loaded');
    updateCartDisplay();
});

function updateCartDisplay() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');

    if (!cartItemsContainer || !cartTotalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalPriceElement.innerText = total.toFixed(2);
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function removeFromCart(name) {
    let cart = getCart();
    const itemIndex = cart.findIndex(cartItem => cartItem.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity === 0) {
            cart = cart.filter(cartItem => cartItem.name !== name);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}
