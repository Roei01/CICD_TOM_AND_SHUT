// contact.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact page loaded');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.success) {
                    document.querySelector('.contact-container').innerHTML = `
                        <h2>Thank you for contacting us!</h2>
                        <p>We will get back to you shortly.</p>
                    `;
                } else {
                    showErrorNotification('Failed to send message. Please try again later.');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                showErrorNotification('Failed to send message. Please try again later.');
            }
        });
    }
});

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
