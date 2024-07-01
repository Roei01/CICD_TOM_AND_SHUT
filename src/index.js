import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// Set __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to serve static files and parse request body
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'royinagar2@gmail.com', // Replace with your email
        pass: 'pryk uqde apyp kuwl' // Replace with your app password
    }
});

const generatePage = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #121212;
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .header {
            background-color: #222;
            color: #fff;
            padding: 20px;
            text-align: center;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .header h1 {
            margin: 0;
            font-size: 2em;
        }
        .navbar {
            background-color: #333;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 10px 0;
            text-align: center;
            position: fixed;
            width: 100%;
            top: 60px;
            z-index: 1000;
        }
        .navbar a {
            color: #ffda79;
            text-align: center;
            padding: 14px 20px;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s, color 0.3s;
        }
        .navbar a:hover {
            background-color: #ffda79;
            color: #121212;
        }
        .content {
            flex: 1;
            padding: 120px 20px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .footer {
            background-color: #222;
            color: #fff;
            text-align: center;
            padding: 10px;
            position: fixed;
            width: 100%;
            bottom: 0;
        }
        .menu-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }
        .menu-item {
            background-color: #333;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .menu-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .menu-item img {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
            height: 200px;
        }
        .menu-item h3 {
            margin: 10px 0;
        }
        .menu-item p {
            color: #ccc;
        }
        .menu-item button {
            background-color: #ffda79;
            color: #121212;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .menu-item button:hover {
            background-color: #ffcd00;
        }
        form {
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 0 auto;
            background: #333;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        form label {
            margin-top: 10px;
        }
        form input, form textarea {
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #444;
            border-radius: 4px;
            background: #222;
            color: #fff;
            font-family: 'Poppins', sans-serif;
        }
        form input[type="submit"] {
            background-color: #ffda79;
            color: #121212;
            border: none;
            cursor: pointer;
            margin-top: 20px;
            padding: 15px;
            transition: background-color 0.3s;
        }
        form input[type="submit"]:hover {
            background-color: #ffcd00;
        }
        .home-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-top: 20px;
            max-height: 500px;
            object-fit: cover;
        }
        .home-text {
            font-size: 1.2em;
            margin: 20px 0;
            color: #ffda79;
        }
        .contact-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }
        .contact-form, .map {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
        .map iframe {
            width: 100%;
            height: 300px;
            border: none;
            border-radius: 8px;
        }
        @media (min-width: 769px) {
            .contact-container {
                flex-direction: row;
                justify-content: space-between;
            }
            .contact-form, .map {
                width: 48%;
                padding: 20px;
            }
        }
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ff4444;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: fadeIn 0.5s forwards, fadeOut 0.5s 2.5s forwards;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        #progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 5px;
            background-color: #ffda79;
            z-index: 1000;
        }
        .cart-icon {
            position: fixed;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: 1001;
        }
        .cart-icon img {
            width: 40px;
            height: 40px;
        }
        .cart-total {
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: #ff4444;
            color: #fff;
            border-radius: 50%;
            padding: 5px 10px;
            font-size: 12px;
        }
        .cart-dropdown {
            position: fixed;
            top: 70px;
            right: 20px;
            background-color: #333;
            color: #fff;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 20px;
            display: none;
            z-index: 1000;
        }
        .cart-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 600px;
            padding: 10px 0;
            border-bottom: 1px solid #444;
        }
        .cart-item button {
            background-color: #ff4444;
            color: #fff;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
        }
        .cart-item button:hover {
            background-color: #ff0000;
        }
            
        .cart-dropdown {
            position: fixed;
            top: 70px;
            right: 20px;
            background-color: #333;
            color: #fff;
            border: 1px solid #444;
            border-radius: 8px;
            padding: 20px;
            display: none;
            z-index: 1001; /* Ensure cart is on top */
        }   
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
        <div class="cart-icon" onclick="toggleCart()">
            <img src="/images/cart.png" alt="Cart">
            <div class="cart-total" id="cart-total">0</div>
        </div>
    </div>
    <div class="navbar">
        <a href="/" onclick="event.preventDefault(); loadPage('/');">Home</a>
        <a href="/hours" onclick="event.preventDefault(); loadPage('/hours');">Opening Hours</a>
        <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');">Menu</a>
        <a href="/contact" onclick="event.preventDefault(); loadPage('/contact');">Contact</a>
    </div>
    <div class="cart-dropdown" id="cart-dropdown">
        <div id="cart-items"></div>
        <p>Total: $<span id="cart-total-price">0.00</span></p>
        <a href="/cart" onclick="event.preventDefault(); loadPage('/cart');">View Cart</a>
        <button onclick="checkout()">Checkout</button>
    </div>
    <div class="content fade-in" id="content">
        ${content}
    </div>
    <div class="footer fade-in">
        <p>&copy; 2024 Sushi Store. All rights reserved.</p>
    </div>
    <script src="/scripts.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            applyPageEffects();
            adjustContentHeight();
            initializeCart();
        });
        window.addEventListener('resize', adjustContentHeight);
    </script>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>Welcome to Sushi Store</h2>
    <p class="home-text">Enjoy the best sushi in town. Explore our menu and learn more about us.</p>
    <img class="home-image" src="/images/pexels-isabella-mendes-107313-858501.jpg" alt="Sushi">
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

// עדכון עמוד cart
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

// שמירת עגלת הקניות בעוגייה
app.get('/cart-data', (req, res) => {
    const cart = req.cookies.cart || [];
    res.json(cart);
});

// Handle form submission
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'royinagar2@gmail.com', // Replace with your email
        to: 'royinagar2@gmail.com', // Replace with your email
        subject: `New contact form submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error); // Print detailed error to console
            return res.status(500).send(`Error sending message: ${error.message}`);
        }
        res.send(generatePage('Sushi Store - Contact', '<h2>Thank you for your message!</h2><p>We will get back to you soon.</p>'));
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
