import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Set __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            color: #333;
        }
        .header {
            background-color: #ff4757;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .navbar {
            overflow: hidden;
            background-color: #ff6b81;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .navbar a {
            float: left;
            display: block;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            transition: background-color 0.3s, color 0.3s;
        }
        .navbar a:hover {
            background-color: #fff;
            color: #ff4757;
        }
        .content {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .footer {
            background-color: #ff6b81;
            color: #fff;
            text-align: center;
            padding: 10px;
        }
        .menu-item {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin: 10px;
            display: inline-block;
            width: calc(25% - 40px);
            box-sizing: border-box;
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
            height: 200px; /* Set a fixed height for the images */
        }
        .menu-item h3 {
            margin: 10px 0;
        }
        .menu-item p {
            color: #555;
        }
        form {
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
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
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
        }
        form input[type="submit"] {
            background-color: #ff4757;
            color: #fff;
            border: none;
            cursor: pointer;
            margin-top: 20px;
            padding: 15px;
            transition: background-color 0.3s;
        }
        form input[type="submit"]:hover {
            background-color: #ff6b81;
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
        }
        @media (max-width: 768px) {
            .menu-item {
                width: calc(50% - 40px);
            }
        }
        @media (max-width: 480px) {
            .menu-item {
                width: calc(100% - 40px);
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
    </div>
    <div class="navbar">
        <a href="/">Home</a>
        <a href="/hours">Opening Hours</a>
        <a href="/menu">Menu</a>
        <a href="/contact">Contact</a>
    </div>
    <div class="content">
        ${content}
    </div>
    <div class="footer">
        <p>&copy; 2024 Sushi Store. All rights reserved.</p>
    </div>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>Welcome to Sushi Store</h2>
    <p class="home-text">Enjoy the best sushi in town. Explore our menu and learn more about us.</p>
    <img class="home-image" src="/images/pexels-isabella-mendes-107313-858501.jpg" alt="Sushi">
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
    <div class="menu-item">
        <img src="/images/pexels-frans-van-heerden-201846-670705.jpg" alt="Sushi 1">
        <h3>Sushi Set 1</h3>
        <p>Delicious sushi set with fresh ingredients.</p>
        <p>Price: $12.99</p>
    </div>
    <div class="menu-item">
        <img src="/images/pexels-rajesh-tp-749235-2098085.jpg" alt="Sushi 2">
        <h3>Sushi Set 2</h3>
        <p>Try our special sushi set with exclusive flavors.</p>
        <p>Price: $14.99</p>
    </div>
    <div class="menu-item">
        <img src="/images/pexels-valeriya-1028426.jpg" alt="Sushi 3">
        <h3>Sushi Set 3</h3>
        <p>A perfect combination of taste and freshness.</p>
        <p>Price: $16.99</p>
    </div>
    <div class="menu-item">
        <img src="/images/pexels-valeriya-1148087.jpg" alt="Sushi 4">
        <h3>Sushi Set 4</h3>
        <p>Experience the authentic taste of our sushi.</p>
        <p>Price: $18.99</p>
    </div>
    `;
    res.send(generatePage('Sushi Store - Menu', content));
});

// Contact page
app.get('/contact', (req, res) => {
    const content = `
    <h2>Contact Us</h2>
    <p>Get in touch with us for any inquiries or feedback.</p>
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50"></textarea>
        <input type="submit" value="Submit">
    </form>
    <p>Email: contact@sushistore.com</p>
    <p>Phone: 123-456-7890</p>
    `;
    res.send(generatePage('Sushi Store - Contact', content));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
