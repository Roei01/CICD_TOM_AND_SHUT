import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// Set __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to serve static files and parse request body
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const generatePage = (title, content) => `
<!DOCTYPE html>
<html lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header>
        <div class="header-content">
            <img src="/images/logo.png" alt="Logo" class="logo">
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="/" onclick="event.preventDefault(); loadPage('/');">בית</a>
                    <a href="/hours" onclick="event.preventDefault(); loadPage('/hours');">שעות פתיחה</a>
                    <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');">תפריט</a>
                    <a href="/contact" onclick="event.preventDefault(); loadPage('/contact');">צור קשר</a>
                </div>
            </nav>
            <div class="cart-icon" onclick="toggleCart()">
                <img src="/images/cart.png" alt="Cart">
                <div class="cart-total" id="cart-total">0</div>
            </div>
        </div>
    </header>
    <div class="hero">
        <div class="hero-text">
            <h1>סיפור של בוקר טוב</h1>
            <p>ארוחת הבוקר היא הדרך הקלה ביותר להתחיל את היום עם חיוך.</p>
            <button onclick="openReservation()" class="btn-reservation">הזמן עכשיו</button>
        </div>
    </div>
    <div class="content fade-in" id="content">
        ${content}
    </div>
    <footer>
        <p>&copy; 2024 Sushi Store. All rights reserved.</p>
    </footer>
    <div class="reservation-form" id="reservation-form">
        <div class="form-content">
            <span class="close" onclick="closeReservation()">&times;</span>
            <h2>הזמנת מקום</h2>
            <form action="/reserve" method="post">
                <div class="form-group">
                    <label for="guests">אורחים:</label>
                    <select id="guests" name="guests" required>
                        <option value="1">1 אורח</option>
                        <option value="2">2 אורחים</option>
                        <option value="3">3 אורחים</option>
                        <option value="4">4 אורחים</option>
                        <option value="5">5 אורחים</option>
                        <option value="6">6 אורחים</option>
                        <option value="7">7 אורחים</option>
                        <option value="8">8 אורחים</option>
                        <option value="9">9 אורחים</option>
                        <option value="10">10 אורחים</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="time">שעה:</label>
                    <select id="time" name="time" required></select>
                </div>
                <div class="form-group">
                    <label for="date">תאריך:</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <input type="submit" value="הזמנת מקום">
                </div>
            </form>
        </div>
    </div>
    <script src="/scripts.js"></script>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>Welcome to Sushi Store</h2>
    <p class="home-text">Enjoy the best sushi in town. Explore our menu and learn more about us.</p>
    <img class="home-image" src="/images/sushi.jpg" alt="Sushi">
    <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');" class="btn">Explore Menu</a>
    `;
    res.send(generatePage('Sushi Store - Home', content));
});

// Opening Hours page
app.get('/hours', (req, res) => {
    const content = `
    <h2>Opening Hours</h2>
    <p>We are open every day of the week to serve you the best sushi.</p>
    <ul>
        <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
        <li>Saturday: 12:00 PM - 11:00 PM</li>
        <li>Sunday: 12:00 PM - 9:00 PM</li>
    </ul>
    `;
    res.send(generatePage('Sushi Store - Opening Hours', content));
});

// Menu page
app.get('/menu', (req, res) => {
    const content = `
    <h2>Our Menu</h2>
    <div class="menu-container">
        <div class="menu-item">
            <img src="/images/pexels-frans-van-heerden-201846-670705.jpg" alt="Sushi 1">
            <h3>Sushi Set 1</h3>
            <p>Delicious sushi set with fresh ingredients.</p>
            <p>Price: $12.99</p>
            <button onclick="addToCart('Sushi Set 1', 12.99)">Add to Cart</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-rajesh-tp-749235-2098085.jpg" alt="Sushi 2">
            <h3>Sushi Set 2</h3>
            <p>Try our special sushi set with exclusive flavors.</p>
            <p>Price: $14.99</p>
            <button onclick="addToCart('Sushi Set 2', 14.99)">Add to Cart</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-valeriya-1028426.jpg" alt="Sushi 3">
            <h3>Sushi Set 3</h3>
            <p>A perfect combination of taste and freshness.</p>
            <p>Price: $16.99</p>
            <button onclick="addToCart('Sushi Set 3', 16.99)">Add to Cart</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-valeriya-1148087.jpg" alt="Sushi 4">
            <h3>Sushi Set 4</h3>
            <p>Experience the authentic taste of our sushi.</p>
            <p>Price: $18.99</p>
            <button onclick="addToCart('Sushi Set 4', 18.99)">Add to Cart</button>
        </div>
    </div>
    `;
    res.send(generatePage('Sushi Store - Menu', content));
});

// Contact page
app.get('/contact', (req, res) => {
    const content = `
    <div class="contact-container">
        <div class="contact-form">
            <h2>Contact Us</h2>
            <p>Get in touch with us for any inquiries or feedback.</p>
            <form action="/send-message" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea>
                <input type="submit" value="Submit">
            </form>
            <p>Email: contact@sushistore.com</p>
            <p>Phone: 123-456-7890</p>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.768280268636!2d34.7925014758049!3d32.08485072526314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4cdd4a67d3b7%3A0x6f6e88c8f16d8402!2zMCDXqNee15XXldeuLCDXqNeQ15jXldeo15kgMTI1NCDXqdeR15XXqiBcdTAwMDQg2LPZhNmF2LHZitivINmE2YXYsdmG2Lkg15HXmdec15ogNCAxNyDYp9mE2KzZhdmF2IwgMTY1NzEg0L_RgNC10L_QvtGA0L7QtNGB0YLQsNGC!5e0!3m2!1sen!2sil!4v1688146201798!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
    `;
    res.send(generatePage('Sushi Store - Contact', content));
});

// Cart page
app.get('/cart', (req, res) => {
    const content = `
    <h2>Your Cart</h2>
    <div class="cart-page">
        <div id="cart-items"></div>
        <p>Total: $<span id="cart-total-price">0.00</span></p>
        <button onclick="checkout()">Checkout</button>
    </div>
    `;
    res.send(generatePage('Sushi Store - Cart', content));
});

// Reservation form submission handler
app.post('/reserve', (req, res) => {
    const { guests, time, date } = req.body;
    console.log(`Reservation: ${guests} guests at ${time} on ${date}`);
    res.send(generatePage('Sushi Store - Reservation', '<h2>Thank you for your reservation!</h2><p>We look forward to serving you.</p>'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
