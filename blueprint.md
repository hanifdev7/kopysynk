# Project Blueprint

## Overview

This project is a consulting website for Kopysynk Consulting. It is a modern, responsive website with a clean and professional design. The website is built with HTML, CSS, and JavaScript. It integrates Firebase for user authentication and stores user data in a Realtime Database. The site includes a home page, about page, courses page, articles page, contact page, a shopping cart, several policy pages, and a payment page.

## Project Structure

The project has the following file structure:

*   `index.html`: The home page of the website.
*   `about.html`: The about page of the website.
*   `courses.html`: The courses page of the website.
*   `articles.html`: The articles page of the website.
*   `contact.html`: The contact page of the website.
*   `cart.html`: The shopping cart page.
*   `payment.html`: The payment page.
*   `login.html`: The login page of the website.
*   `signup.html`: The sign-up page of the website.
*   `signup-success.html`: A confirmation page shown after a user successfully creates an account.
*   `article1.html` - `article5.html`: Placeholder pages for articles.
*   `refund-policy.html`: The refund policy page.
*   `privacy-policy.html`: The privacy policy page.
*   `digital-delivery-policy.html`: The digital delivery policy page.
*   `style.css`: The stylesheet for the website.
*   `main.js`: The main JavaScript file for the website.
*   `auth.js`: Handles user authentication (login and signup) using Firebase Authentication and stores user data in Firebase Realtime Database.
*   `firebase-config.js`: Contains the Firebase project configuration (requires user-specific credentials).
*   `.idx/mcp.json`: Firebase MCP configuration file.
*   `blueprint.md`: This file.

## Design and Features

The website has the following design and features:

*   **Modern Design:** The website has a modern and professional design with a clean layout and a consistent color scheme.
*   **Responsive:** The website is fully responsive and works well on all devices, including desktops, tablets, and smartphones.
*   **Navigation:** The website has a clear and easy-to-use navigation menu that allows users to easily find the information they are looking for.
*   **Home Page:** The home page features a hero section with a headline and a call-to-action button, as well as sections for courses and articles.
*   **About Page:** The about page provides information about the company and its mission.
*   **Courses Page:** The courses page lists the courses offered by the company, with a brief description and an "Add to Cart" button for each course.
*   **Articles Page:** The articles page has been restyled to use the same card-based design as the home page's "Recent Articles" section. This provides a consistent and responsive layout for browsing articles.
*   **Contact Page:** The contact page includes a contact form that users can use to get in touch with the company.
*   **Policy Pages:** The site includes dedicated pages for the refund policy, privacy policy, and digital delivery policy.
*   **Firebase Authentication:** The website uses Firebase Authentication for secure user signup and login with email and password.
*   **Authentication Pages (Login & Signup):**
    *   The login and signup pages now feature a modern, responsive design.
    *   The forms are presented in a centered, card-like container with a box shadow, providing a clean and focused user experience.
    *   The layout adapts seamlessly to different screen sizes, ensuring usability on both mobile and desktop devices.
*   **Realtime User Data:** Upon successful signup, user information (username and email) is stored in the Firebase Realtime Database.
*   **Signup Success Page:** After successfully creating an account, the user is redirected to a confirmation page with a link to the login page. This provides clear feedback and a better user experience.
*   **Form Validation:** The login and signup forms have client-side validation to ensure that users enter valid data before submitting to Firebase.
*   **User Personalization:** The header of the website now greets logged-in users by their name, creating a more personal and welcoming experience.
*   **Profile Icon for Authentication:** Replaced the "Login" and "Logout" text buttons with a profile icon for a cleaner, more modern UI. The icon directs to the login page for guests and acts as a logout button for authenticated users.
*   **Shopping Cart:**
    *   Users can add courses to their shopping cart from the courses page.
    *   A dedicated `cart.html` page displays all items in the cart.
    *   Users can remove items from the cart.
    *   The total price is dynamically calculated and displayed in Indian Rupees (₹).
    *   The cart's state is persisted using the browser's local storage.
    *   A "Checkout" button in the cart links to the payment page.
    *   A cart icon in the header displays the number of items in the cart.
*   **Payment Page:**
    *   A dedicated `payment.html` page for processing payments.
    *   Tabbed interface to select between Credit/Debit Card, UPI, and Netbanking payment methods.
    *   Styled forms for each payment method, now fully responsive.
    *   The UPI tab features clickable icons for Google Pay and Paytm. Clicking an icon dynamically generates and displays a QR code for the corresponding UPI ID.
*   **Footer:**
    *   A consistent footer is present on all pages.
    *   The footer contains links to the privacy policy, refund policy, and digital delivery policy.
    *   The footer is now styled and responsive.
*   **Recent Articles Section (Home Page):**
    *   The "Recent Articles" section on the home page has been restyled for a more polished and visually appealing look.
    *   Article cards now feature a background color, a border that highlights on hover, and a box shadow for a lifting effect.
    *   The typography has been refined for better readability, and a "Read More" link has been added to each card.
    *   The section is fully responsive and stacks vertically on smaller screens.

## Current Task

*   **Task:** Check and fix the UI styles in `login.html` and make it as responsive.
*   **Steps:**
    *   Added new responsive styles to `style.css` for the authentication container (`auth-container`), creating a centered, card-like layout for the login form.
    *   Updated `login.html` to include the `cart-count` element in the header and ensure the form structure is consistent with the new styles.
    *   Updated the copyright year to 2024 in `login.html`.
    *   Updated `blueprint.md` to document the UI improvements for the login page.
