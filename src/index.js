import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sushi Store</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 0;
            }
            .header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .product {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 10px;
                margin: 10px;
                display: inline-block;
                width: calc(25% - 22px);
                box-sizing: border-box;
            }
            .product img {
                width: 100%;
                border-radius: 4px;
            }
            .product h3 {
                margin: 10px 0;
            }
            .product p {
                color: #555;
            }
            .footer {
                background-color: #333;
                color: #fff;
                text-align: center;
                padding: 10px;
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Welcome to Sushi Store</h1>
        </div>
        <div class="content">
            <div class="product">
                <img src="https://via.placeholder.com/300" alt="Sushi 1">
                <h3>Sushi Set 1</h3>
                <p>Delicious sushi set with fresh ingredients.</p>
            </div>
            <div class="product">
                <img src="https://via.placeholder.com/300" alt="Sushi 2">
                <h3>Sushi Set 2</h3>
                <p>Try our special sushi set with exclusive flavors.</p>
            </div>
            <div class="product">
                <img src="https://via.placeholder.com/300" alt="Sushi 3">
                <h3>Sushi Set 3</h3>
                <p>A perfect combination of taste and freshness.</p>
            </div>
            <div class="product">
                <img src="https://via.placeholder.com/300" alt="Sushi 4">
                <h3>Sushi Set 4</h3>
                <p>Experience the authentic taste of our sushi.</p>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2024 Sushi Store. All rights reserved.</p>
        </div>
    </body>
    </html>
    `;
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
