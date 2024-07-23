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

// דף הבית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// דף שעות פתיחה
app.get('/hours', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hours.html'));
});

// דף תפריט
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// דף יצירת קשר
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// דף עגלה
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// הוספת נתיב לטיפול בטופס הזמנה
app.post('/reserve', (req, res) => {
    const { guests, time, date } = req.body;
    console.log(`Reservation: ${guests} guests at ${time} on ${date}`);
    res.send(generatePage('Sushi Store - Reservation', '<h2>Thank you for your reservation!</h2><p>We look forward to serving you.</p>'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
