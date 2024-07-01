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
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
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
        form input, form textarea, form select {
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
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
    </div>
    <div class="navbar">
        <a href="/" onclick="event.preventDefault(); loadPage('/');">Home</a>
        <a href="/hours" onclick="event.preventDefault(); loadPage('/hours');">Opening Hours</a>
        <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');">Menu</a>
        <a href="/contact" onclick="event.preventDefault(); loadPage('/contact');">Contact</a>
        <a href="/reservations" onclick="event.preventDefault(); loadPage('/reservations');">Reservations</a>
    </div>
    <div class="content fade-in" id="content">
        ${content}
    </div>
    <div class="footer fade-in">
        <p>&copy; 2024 Chef's Restaurant. All rights reserved.</p>
    </div>
    <script src="/scripts.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            applyPageEffects();
            adjustContentHeight();
        });
        window.addEventListener('resize', adjustContentHeight);
    </script>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>Welcome to Chef's Restaurant</h2>
    <p class="home-text">Enjoy a fine dining experience with exquisite dishes crafted by our renowned chef.</p>
    <img class="home-image" src="/images/restaurant.jpg" alt="Restaurant">
    <a href="/menu" onclick="event.preventDefault(); loadPage('/menu');" class="btn">Explore Menu</a>
    `;
    res.send(generatePage('Chef\'s Restaurant - Home', content));
});

// Opening Hours page
app.get('/hours', (req, res) => {
    const content = `
    <h2>Opening Hours</h2>
    <p>We are open every day of the week to serve you the best dishes.</p>
    <ul>
        <li>Monday - Friday: 12:00 PM - 11:00 PM</li>
        <li>Saturday: 12:00 PM - 11:00 PM</li>
        <li>Sunday: 12:00 PM - 11:00 PM</li>
    </ul>
    `;
    res.send(generatePage('Chef\'s Restaurant - Opening Hours', content));
});

// Menu page
app.get('/menu', (req, res) => {
    const content = `
    <h2>Our Menu</h2>
    <div class="menu-container">
        <div class="menu-item">
            <img src="/images/dish1.jpg" alt="Dish 1">
            <h3>Dish 1</h3>
            <p>Delicious dish with fresh ingredients.</p>
        </div>
        <div class="menu-item">
            <img src="/images/dish2.jpg" alt="Dish 2">
            <h3>Dish 2</h3>
            <p>Try our special dish with exclusive flavors.</p>
        </div>
        <div class="menu-item">
            <img src="/images/dish3.jpg" alt="Dish 3">
            <h3>Dish 3</h3>
            <p>A perfect combination of taste and freshness.</p>
        </div>
        <div class="menu-item">
            <img src="/images/dish4.jpg" alt="Dish 4">
            <h3>Dish 4</h3>
            <p>Experience the authentic taste of our dishes.</p>
        </div>
    </div>
    `;
    res.send(generatePage('Chef\'s Restaurant - Menu', content));
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
            <p>Email: contact@chefsrestaurant.com</p>
            <p>Phone: 123-456-7890</p>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_LINK" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
    `;
    res.send(generatePage('Chef\'s Restaurant - Contact', content));
});

// Reservations page
app.get('/reservations', (req, res) => {
    const content = `
    <h2>Book a Table</h2>
    <form action="/book-reservation" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required>
        <label for="time">Time:</label>
        <input type="time" id="time" name="time" min="12:00" max="23:00" step="900" required>
        <label for="guests">Number of Guests:</label>
        <select id="guests" name="guests" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <input type="submit" value="Book">
    </form>
    `;
    res.send(generatePage('Chef\'s Restaurant - Reservations', content));
});

// Handle form submission for reservations
app.post('/book-reservation', (req, res) => {
    const { name, email, date, time, guests } = req.body;

    const mailOptions = {
        from: 'royinagar2@gmail.com', // Replace with your email
        to: 'royinagar2@gmail.com', // Replace with your email
        subject: `New reservation from ${name}`,
        text: `Reservation details:\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\nNumber of Guests: ${guests}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error); // Print detailed error to console
            return res.status(500).send(`Error booking reservation: ${error.message}`);
        }
        res.send(generatePage('Chef\'s Restaurant - Reservations', '<h2>Thank you for your reservation!</h2><p>We look forward to serving you.</p>'));
    });
});

// Handle form submission for contact messages
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
        res.send(generatePage('Chef\'s Restaurant - Contact', '<h2>Thank you for your message!</h2><p>We will get back to you soon.</p>'));
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
