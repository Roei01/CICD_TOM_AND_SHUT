import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

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
            user: 'your-email@gmail.com',
            pass: 'your-email-password' 
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
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
<html dir="rtl" lang="he-IL">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="header-wrap">
        <nav id="mobile-header" class="main-navigation mobile-header-navigation">
            <div class="inside-navigation">
                <div class="site-logo mobile-header-logo">
                    <a href="/" title="רוסטיקו" rel="home">
                        <img src="/images/logo.png" alt="Logo" class="is-logo-image">
                    </a>
                </div>
                <div class="mobile-bar-items">
                    <a href="https://www.facebook.com/YOUR_BUSINESS_PAGE" target="_blank"><i class="fa fa-facebook-square"></i></a>
                    <a href="https://www.instagram.com/YOUR_BUSINESS_PAGE" target="_blank"><i class="fa fa-instagram"></i></a>
                </div>
                <button class="menu-toggle" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                    <span class="screen-reader-text">Menu</span>
                </button>
                <div id="mobile-menu" class="main-nav">
                    <ul>
                        <li><a href="/">דף הבית</a></li>
                        <li><a href="/menu">תפריט</a></li>
                        <li><a href="/hours">שעות פתיחה</a></li>
                        <li><a href="/contact">צור קשר</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="content">
        ${content}
    </div>
    <div class="footer">
        <p>&copy; 2024 רוסטיקו. כל הזכויות שמורות.</p>
    </div>
    <script src="/scripts.js"></script>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>ברוכים הבאים לרוסטיקו</h2>
    <p class="home-text">תהנו מהסושי הכי טוב בעיר. חקרו את התפריט שלנו ולמדו עוד עלינו.</p>
    <img class="home-image" src="/images/pexels-frans-van-heerden-201846-670705.jpg" alt="Sushi">
    <a href="/menu" class="btn">חקרו את התפריט</a>
    `;
    res.send(generatePage('רוסטיקו - דף הבית', content));
});

// Opening Hours page
app.get('/hours', (req, res) => {
    const content = `
    <h2>שעות פתיחה</h2>
    <p>אנחנו פתוחים כל יום בשבוע כדי לשרת אתכם את הסושי הכי טוב.</p>
    <ul>
        <li>שני - שישי: 11:00 - 22:00</li>
        <li>שבת: 12:00 - 23:00</li>
        <li>ראשון: 12:00 - 21:00</li>
    </ul>
    `;
    res.send(generatePage('רוסטיקו - שעות פתיחה', content));
});

// Menu page
app.get('/menu', (req, res) => {
    const content = `
    <h2>התפריט שלנו</h2>
    <div class="menu-container">
        <div class="menu-item">
            <img src="/images/pexels-frans-van-heerden-201846-670705.jpg" alt="Sushi 1">
            <h3>סט סושי 1</h3>
            <p>סט סושי טעים עם מרכיבים טריים.</p>
            <p>מחיר: $12.99</p>
            <button onclick="addToCart('Sushi Set 1', 12.99)">הוסף לעגלה</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-rajesh-tp-749235-2098085.jpg" alt="Sushi 2">
            <h3>סט סושי 2</h3>
            <p>סט סושי מיוחד עם טעמים ייחודיים.</p>
            <p>מחיר: $14.99</p>
            <button onclick="addToCart('Sushi Set 2', 14.99)">הוסף לעגלה</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-valeriya-1028426.jpg" alt="Sushi 3">
            <h3>סט סושי 3</h3>
            <p>שילוב מושלם של טעם וטריות.</p>
            <p>מחיר: $16.99</p>
            <button onclick="addToCart('Sushi Set 3', 16.99)">הוסף לעגלה</button>
        </div>
        <div class="menu-item">
            <img src="/images/pexels-valeriya-1148087.jpg" alt="Sushi 4">
            <h3>סט סושי 4</h3>
            <p>חוו את הטעם האותנטי של הסושי שלנו.</p>
            <p>מחיר: $18.99</p>
            <button onclick="addToCart('Sushi Set 4', 18.99)">הוסף לעגלה</button>
        </div>
    </div>
    `;
    res.send(generatePage('רוסטיקו - תפריט', content));
});

// Contact page
app.get('/contact', (req, res) => {
    const content = `
    <div class="contact-container">
        <div class="contact-form">
            <h2>צור קשר</h2>
            <p>צרו קשר איתנו לכל שאלה או משוב.</p>
            <form id="contact-form">
                <label for="name">שם:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">אימייל:</label>
                <input type="email" id="email" name="email" required>
                <label for="message">הודעה:</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea>
                <input type="submit" value="שלח">
            </form>
            <p>אימייל: contact@sushistore.com</p>
            <p>טלפון: 123-456-7890</p>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.768280268636!2d34.7925014758049!3d32.08485072526314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4cdd4a67d3b7%3A0x6f6e88c8f16d8402!2zMCDXqNee15XXldeuLCDXqNeQ15jXldeo15kgMTI1NCDXqdeR15XXqiBcdTAwMDQg2LPZhNmF2LHZitivINmE2YXYsdmG2Lkg15HXmdec15ogNCAxNyDYp9mE2KzZhdmF2IwgMTY1NzEg0L_RgNC10L_QvtGA0L7QtNGB0YLQsNGC!5e0!3m2!1sen!2sil!4v1688146201798!5m2!1sen!2sil" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
    <div id="thank-you-message" style="display: none;">
        <h2>תודה שפניתם אלינו!</h2>
        <p>נחזור אליכם בהקדם האפשרי.</p>
    </div>
    `;
    res.send(generatePage('רוסטיקו - צור קשר', content));
});

// Cart page
app.get('/cart', (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    let itemsHtml = '';

    cart.forEach(item => {
        itemsHtml += `
            <div class="cart-item">
                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="removeFromCart('${item.name}')">הסר</button>
            </div>
        `;
    });

    const content = `
        <h2>העגלה שלי</h2>
        <div class="cart-page">
            <div id="cart-items">${itemsHtml}</div>
            <p>סה"כ: $<span id="cart-total-price">${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span></p>
            <button onclick="checkout()">לתשלום</button>
        </div>
    `;
    res.send(generatePage('רוסטיקו - עגלה', content));
});

// Reservation form submission handler
app.post('/reserve', (req, res) => {
    const { guests, time, date } = req.body;
    console.log(`Reservation: ${guests} guests at ${time} on ${date}`);
    res.send(generatePage('רוסטיקו - הזמנה', '<h2>תודה על ההזמנה!</h2><p>מצפים לשרת אתכם בקרוב.</p>'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
