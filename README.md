CICD Project

# Sushi Store Website

Welcome to the Sushi Store website repository! This project is a simple web application for a sushi store, built using Node.js, Express, HTML, CSS, and JavaScript. The website includes various pages such as home, opening hours, menu, contact, and a shopping cart functionality.

## Table of Contents

- Project Overview
- Features
- Technologies Used
- Setup Instructions
- Usage
- Folder Structure
- Contributing
- License

# Project Overview

The Sushi Store website aims to provide users with an engaging and interactive experience. It allows customers to browse the menu, view opening hours, contact the store, and place orders online. The website is designed to be responsive and user-friendly.

# Features

- **Home Page**: Welcome message and introduction to the sushi store.
- **Opening Hours**: Display of the store's opening hours.
- **Menu**: Detailed menu with images, descriptions, and prices of sushi items.
- **Contact**: Contact form for inquiries and feedback, along with a map for location.
- **Shopping Cart**: Add items to the cart, view cart, and checkout functionality.
- **Reservation Form**: Reserve a table at the sushi store.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **Database**: None (using local storage and cookies for cart management)
- **Other**: Google Maps Embed API

## Setup Instructions

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sushi-store.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sushi-store
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to see the website in action.

## Usage

### Adding Items to Cart

- Navigate to the **Menu** page.
- Click on the **Add to Cart** button for any sushi item.
- The item will be added to your shopping cart.

### Viewing and Managing Cart

- Click on the cart icon in the header to view your cart.
- You can remove items from the cart or proceed to checkout.

### Making a Reservation

- Click on the reservation icon in the footer.
- Fill out the reservation form and submit.

### Contacting the Store

- Navigate to the **Contact** page.
- Fill out the contact form and submit your message.

## Folder Structure

```
sushi-store/
├── public/
│   ├── images/
│   ├── scripts.js
│   ├── styles.css
│   └── index.html
├── index.js
├── package.json
└── README.md
```

- **public/**: Contains all the static files (images, CSS, JavaScript).
- **index.js**: Main server file.
- **package.json**: Project metadata and dependencies.
- **README.md**: Project documentation.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the Sushi Store website! If you have any questions or feedback, feel free to contact us.