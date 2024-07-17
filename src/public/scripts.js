document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.main-nav').classList.toggle('active');
    });

    document.querySelectorAll('.menu-item button').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(itemName, itemPrice);
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.success) {
                    document.querySelector('.contact-container').innerHTML = `
                        <h2>תודה שפניתם אלינו!</h2>
                        <p>נחזור אליכם בהקדם האפשרי.</p>
                    `;
                } else {
                    showErrorNotification('Failed to send message. Please try again later.');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                showErrorNotification('Failed to send message. Please try again later.');
            }
        });
    }

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path, true); // Force refresh on popstate
        }
    });

    applyPageEffects();
    adjustContentHeight();
    initializeCart();
    loadCartFromCookie();
    window.addEventListener('beforeunload', saveCartToCookie);
});

function addToCart(name, price) {
    const item = {
        name: name,
        price: price,
        quantity: 1
    };

    const cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    saveCart(cart);
    updateCartDisplay();
    showCartDropdown();
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.cookie = `cart=${JSON.stringify(cart)};path=/;`;
}

function updateCartDisplay() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    if (!cartItemsContainer || !cartTotalElement || !cartTotalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">הסר</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = cart.length; // Update the cart total items count
    cartTotalPriceElement.innerText = total.toFixed(2);

    const cartIconCount = document.getElementById('cart-total');
    if (cartIconCount) {
        cartIconCount.innerText = cart.length;
    }
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

    saveCart(cart);
    updateCartDisplay();

    window.location.reload();
}

function isCartEmpty() {
    const cart = getCart();
    return cart.length === 0;
}

function checkout() {
    if (isCartEmpty()) {
        alert('העגלה שלך ריקה!');
        return;
    }
    alert('תודה על הרכישה שלך!');
    localStorage.removeItem('cart');
    document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    updateCartDisplay();
    loadPage('/cart', true);
}

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function applyPageEffects() {
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.transition = 'opacity 1s';
            element.style.opacity = 1;
        }, 100);
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.transform = 'scale(0)';
        setTimeout(() => {
            item.style.transition = 'transform 0.5s';
            item.style.transform = 'scale(1)';
        }, 100);
    });

    adjustContentHeight();
    initializeCart();
}

function adjustContentHeight() {
    const content = document.querySelector('.content');
    const footer = document.querySelector('.footer');
    if (content && footer) {
        const contentHeight = content.offsetHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = footer.offsetHeight;

        if (contentHeight + footerHeight < windowHeight) {
            content.style.minHeight = `${windowHeight - footerHeight}px`;
        } else {
            content.style.minHeight = 'auto';
        }
    }
}

document.addEventListener('DOMContentLoaded', adjustContentHeight);
window.addEventListener('resize', adjustContentHeight);

function saveCartToCookie() {
    const cart = getCart();
    document.cookie = `cart=${JSON.stringify(cart)};path=/;`;
}

function loadCartFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'cart') {
            localStorage.setItem('cart', value);
            updateCartDisplay();
            saveCartToCookie();
            loadPage('/cart', true);
            break;
        }
    }
}
