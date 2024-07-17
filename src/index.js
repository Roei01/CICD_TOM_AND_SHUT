import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer'; // ייבוא nodemailer

const app = express();
const port = 3000;

// Set __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to serve static files and parse request body
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// פונקציה לשליחת מייל
async function sendEmail(name, email, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'royinagar2@gmail.com',
            pass: 'pryk uqde apyp kuwl'
        }
    });

    let mailOptions = {
        from: 'royinagar2@gmail.com',
        to: 'royinagar2@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
}

// הוספת נתיב לטיפול בטפסי יצירת קשר
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Message received from ${name} (${email}): ${message}`);

    try {
        await sendEmail(name, email, message);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.json({ success: false });
    }
});

const generatePage = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="header">
        <img src="/images/logo.png" alt="Logo" class="logo"> <!-- לוגו -->
        <h1>${title}</h1>
        <div class="cart-icon" onclick="toggleCart()">
            <img src="/images/cart.png" alt="Cart">
            <div class="cart-total" id="cart-total">0</div>
        </div>
        <div class="social-icons">
            <a href="https://www.facebook.com/YOUR_BUSINESS_PAGE" target="_blank"><img src="/images/facebook.png" alt="Facebook"></a>
            <a href="https://www.instagram.com/YOUR_BUSINESS_PAGE" target="_blank"><img src="/images/instagram.png" alt="Instagram"></a>
        </div>
    </div>
    <div class="navbar">
        <a href="/" onclick="event.preventDefault(); loadPage('/');">Home</a>
        <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');">Menu</a>
        <a href="/hours" onclick="event.preventDefault(); loadPage('/hours');">Opening Hours</a>
        <a href="/contact" onclick="event.preventDefault(); loadPage('/contact');">Contact</a>
    </div>
    <div class="cart-dropdown" id="cart-dropdown">
        <div id="cart-items"></div>
        <p>Total: $<span id="cart-total-price">0.00</span></p>
        <a href="/cart" onclick="event.preventDefault(); loadPage('/cart', true);">View Cart</a>
        <button onclick="checkout()">Checkout</button>
    </div>
    <div class="content fade-in" id="content">
        ${content}
    </div>
    <div class="footer fade-in">
        <p>&copy; 2024 Sushi Store. All rights reserved.</p>
    </div>
    <div class="reservation-icon" onclick="openReservation()">
        <img src="/images/reservation.png" alt="Reservation">
    </div>
    <div class="reservation-form" id="reservation-form">
        <div class="form-content">
            <span class="close" onclick="closeReservation()">&times;</span>
            <h2>reservation</h2>
            <form id="reservation-form">
                <div class="form-group">
                    <label for="guests">guests:</label>
                    <select id="guests" name="guests" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="time">שעה:</label>
                    <select id="time" name="time" required>
                        <!-- תוסיף אופציות נוספות להפרשים של רבע שעה -->
                        <option value="16:00">16:00</option>
                        <option value="16:15">16:15</option>
                        <option value="16:30">16:30</option>
                        <option value="16:45">16:45</option>
                        <option value="17:00">17:00</option>
                        <option value="17:15">17:15</option>
                        <!-- ועוד... -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="date">תאריך:</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="seating">אפשרות הושבה:</label>
                    <select id="seating" name="seating" required>
                        <option value="inside">inside</option>
                        <option value="outside">outside</option>
                        <option value="bar">bar</option>
                    </select>
                </div>
                <input type="submit" value="reservation">
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
    <img class="home-image" src="/images/pexels-frans-van-heerden-201846-670705.jpg" alt="Sushi">
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
            <form id="contact-form">
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
    <div id="thank-you-message" style="display: none;">
        <h2>Thank you for contacting us!</h2>
        <p>We will get back to you shortly.</p>
    </div>
    `;
    res.send(generatePage('Sushi Store - Contact', content));
});

// Cart page
app.get('/cart', (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    let itemsHtml = '';

    cart.forEach(item => {
        itemsHtml += `
            <div class="cart-item">
                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    const content = `
        <h2>My Cart</h2>
        <div class="cart-page">
            <div id="cart-items">${itemsHtml}</div>
            <p>Total: $<span id="cart-total-price">${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span></p>
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
