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
        pass: 'pryk uqde apyp kuwl' // Replace with your app password
    }
});

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
    <div class="header">
        <img src="/images/logo.png" alt="Rustico">
    </div>
    <div class="navbar">
        <a href="/">דף הבית</a>
        <a href="/menu">תפריט</a>
        <a href="/about">אודות</a>
        <a href="/contact">צור קשר</a>
    </div>
    <div class="content fade-in" id="content">
        ${content}
    </div>
    <div class="footer fade-in">
        <p>&copy; 2024 Rustico. כל הזכויות שמורות.</p>
    </div>
    <script src="/scripts.js"></script>
</body>
</html>
`;

// Home page
app.get('/', (req, res) => {
    const content = `
    <h2>ברוכים הבאים לרוסטיקו</h2>
    <p class="home-text">אנו מציעים לכם חווית אוכל בלתי נשכחת עם מנות משובחות שנבחרו בקפידה.</p>
    <img class="home-image" src="/images/restaurant.jpg" alt="Restaurant">
    <a href="/menu" class="btn">לצפייה בתפריט</a>
    `;
    res.send(generatePage('Rustico - דף הבית', content));
});

// Menu page
app.get('/menu', (req, res) => {
    const content = `
    <h2>תפריט</h2>
    <div class="menu-section">
        <div class="menu-category">
            <h3>ראשונות</h3>
            <div class="menu-item">
                <div>
                    <h4>פוקאצ'ה רוסטיקו</h4>
                    <p>מוגשת עם ויניגרט ענבים ובלסמי לבן, שום קונפי ושמן זית</p>
                </div>
                <span>28₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>שרימפס בלימון</h4>
                    <p>שרימפס בחמאת שום, לימון ויין לבן</p>
                </div>
                <span>62₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>קרפצ'יו רוסטיקו</h4>
                    <p>קרפצ'יו בקר עם ארוגולה, צנוברים, ויניגרט בלסמי</p>
                </div>
                <span>62₪</span>
            </div>
        </div>
        <div class="menu-category">
            <h3>עיקריות</h3>
            <div class="menu-item">
                <div>
                    <h4>פילה דג בגריל</h4>
                    <p>פילה דג טרי צלוי בגריל, מוגש עם ירקות קלויים</p>
                </div>
                <span>88₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>המבורגר רוסטיקו</h4>
                    <p>המבורגר ביתי עסיסי עם צ'יפס וירקות טריים</p>
                </div>
                <span>62₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>סטייק אנטריקוט</h4>
                    <p>סטייק אנטריקוט משובח מוגש עם תוספת לבחירה</p>
                </div>
                <span>134₪</span>
            </div>
        </div>
        <div class="menu-category">
            <h3>קינוחים</h3>
            <div class="menu-item">
                <div>
                    <h4>טירמיסו</h4>
                    <p>קינוח איטלקי קלאסי עם שכבות של קרם, קפה וקקאו</p>
                </div>
                <span>28₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>עוגת גבינה</h4>
                    <p>עוגת גבינה עשירה עם בסיס ביסקוויטים ופירות יער</p>
                </div>
                <span>34₪</span>
            </div>
            <div class="menu-item">
                <div>
                    <h4>פנקוטה וניל</h4>
                    <p>פנקוטה קרמית עם רוטב פירות טריים</p>
                </div>
                <span>26₪</span>
            </div>
        </div>
    </div>
    `;
    res.send(generatePage('Rustico - תפריט', content));
});

// Contact page
app.get('/contact', (req, res) => {
    const content = `
    <div class="contact-container">
        <div class="contact-form">
            <h2>צור קשר</h2>
            <p>קשרו איתנו לכל שאלה או הערה.</p>
            <form action="/send-message" method="post">
                <label for="name">שם:</label>
                <input type="text" id="name" name="name" required>
                <label for="email">אימייל:</label>
                <input type="email" id="email" name="email" required>
                <label for="message">הודעה:</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea>
                <input type="submit" value="שלח">
            </form>
            <p>אימייל: contact@rustico.com</p>
            <p>טלפון: 03-1234567</p>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_LINK" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
    `;
    res.send(generatePage('Rustico - צור קשר', content));
});

// About page
app.get('/about', (req, res) => {
    const content = `
    <h2>אודות רוסטיקו</h2>
    <p>רוסטיקו הוקמה בשנת 2005 במטרה להביא את מיטב המטבח האיטלקי לארץ. אנו מציעים תפריט מגוון של מנות איכותיות שנבחרו בקפידה.</p>
    <img class="about-image" src="/images/chef.jpg" alt="Chef">
    `;
    res.send(generatePage('Rustico - אודות', content));
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
        res.send(generatePage('Rustico - צור קשר', '<h2>תודה על פנייתך!</h2><p>נחזור אליך בהקדם האפשרי.</p>'));
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
