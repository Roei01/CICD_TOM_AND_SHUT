// scripts.js

console.log('script.js loaded');

const cache = {};

function loadPage(url) {
    if (cache[url]) {
        console.log(`Loading page from cache: ${url}`);
        document.querySelector('.content').innerHTML = cache[url];
        window.history.pushState({ path: url }, '', url);
        applyPageEffects();
        updateCartDisplay(); // עדכון תצוגת הסל לאחר טעינת עמוד מהמטמון
        return;
    }

    console.log(`Loading page: ${url}`);
    showLoadingIndicator();
    showProgressBar();
    fetch(url)
        .then(response => response.text())
        .then(html => {
            cache[url] = html;
            document.querySelector('.content').innerHTML = html;
            window.history.pushState({ path: url }, '', url);
            applyPageEffects();
            updateCartDisplay(); // עדכון תצוגת הסל לאחר טעינת עמוד חדש
        })
        .catch(error => {
            console.error('Error loading page:', error);
            showErrorNotification('Failed to load page.');
        })
        .finally(() => {
            hideLoadingIndicator();
            hideProgressBar();
        });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loadPage(this.getAttribute('href'));
        });
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path);
        }
    });

    applyPageEffects();
    adjustContentHeight();
    initializeCart();
    loadCartFromCookie();
    window.addEventListener('beforeunload', saveCartToCookie);
    updateCartDisplay(); // עדכון תצוגת הסל בטעינת הדף הראשונה
    initializeReservationForm(); // אתחול טופס ההזמנה
});

function initializeReservationForm() {
    const timeInput = document.getElementById('time');
    const dateInput = document.getElementById('date');
    
    // הגדרת רווחי זמן של רבע שעה
    timeInput.addEventListener('focus', function() {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 45, 0);

        let options = '';
        for (let time = start; time <= end; time.setMinutes(time.getMinutes() + 15)) {
            const hour = String(time.getHours()).padStart(2, '0');
            const minute = String(time.getMinutes()).padStart(2, '0');
            options += `<option value="${hour}:${minute}">${hour}:${minute}</option>`;
        }

        timeInput.innerHTML = options;
    });

    // הגבלת תאריכים לבאים בלבד ולא יותר משבועיים מראש
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);
    const maxDateString = maxDate.toISOString().split('T')[0];

    dateInput.setAttribute('min', today);
    dateInput.setAttribute('max', maxDateString);
}

function showLoadingIndicator() {
    let loadingIndicator = document.getElementById('loading-indicator');
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        loadingIndicator.innerText = 'Loading...';
        loadingIndicator.style.position = 'fixed';
        loadingIndicator.style.top = '50%';
        loadingIndicator.style.left = '50%';
        loadingIndicator.style.transform = 'translate(-50%, -50%)';
        loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        loadingIndicator.style.color = '#fff';
        loadingIndicator.style.padding = '20px';
        loadingIndicator.style.borderRadius = '8px';
        loadingIndicator.style.zIndex = '1000';
        document.body.appendChild(loadingIndicator);
    }
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

function showProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0';
        progressBar.style.height = '5px';
        progressBar.style.backgroundColor = '#ffda79';
        progressBar.style.zIndex = '1000';
        document.body.appendChild(progressBar);
    }
    progressBar.style.display = 'block';
    progressBar.style.width = '0';
    setTimeout(() => {
        progressBar.style.transition = 'width 2s';
        progressBar.style.width = '100%';
    }, 100);
}

function hideProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.display = 'none';
    }
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
    const footer = document.querySelector('footer');
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

// Cart functionality
function initializeCart() {
    updateCartDisplay();
}

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
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2);
    cartTotalPriceElement.innerText = total.toFixed(2);
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
    showCartDropdown();
}

function checkout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    updateCartDisplay();
}

function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
    } else {
        cartDropdown.style.display = 'block';
        cartDropdown.style.zIndex = '1001'; // Ensure cart is on top
    }
}

function showCartDropdown() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = 'block';
    setTimeout(() => {
        cartDropdown.style.display = 'none';
    }, 3000);
}

// שמירת עגלת הקניות בעוגייה
function saveCartToCookie() {
    const cart = getCart();
    document.cookie = `cart=${JSON.stringify(cart)};path=/;`;
}

// טעינת עגלת הקניות מעוגייה
function loadCartFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'cart') {
            localStorage.setItem('cart', value);
            updateCartDisplay();
            break;
        }
    }
}

// Reservation functionality
function openReservation() {
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.style.display = 'block';
    setTimeout(() => {
        reservationForm.style.transform = 'translate(-50%, -50%) scale(1)';
        reservationForm.style.opacity = '1';
    }, 10);
}

function closeReservation() {
    const reservationForm = document.getElementById('reservation-form');
    reservationForm.style.transform = 'translate(-50%, -50%) scale(0.8)';
    reservationForm.style.opacity = '0';
    setTimeout(() => {
        reservationForm.style.display = 'none';
    }, 300);
}
