console.log('script.js loaded');

const cache = {};

function loadPage(url) {
    if (cache[url]) {
        console.log(`Loading page from cache: ${url}`);
        document.querySelector('.content').innerHTML = cache[url];
        window.history.pushState({ path: url }, '', url);
        applyPageEffects();
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
});

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

    // הוספת אפקטים נוספים לאחר טעינת העמוד
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.transform = 'scale(0)';
        setTimeout(() => {
            item.style.transition = 'transform 0.5s';
            item.style.transform = 'scale(1)';
        }, 100);
    });

    adjustContentHeight();
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

// Cart functionality
function initializeCart() {
    document.querySelectorAll('.menu-item button').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    updateCartDisplay();
}

function addToCart(event) {
    const button = event.target;
    const menuItem = button.closest('.menu-item');
    const item = {
        name: menuItem.querySelector('h3').innerText,
        price: parseFloat(menuItem.querySelector('p').innerText.replace('Price: $', '')),
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
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2);
}

function checkout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    updateCartDisplay();
}
