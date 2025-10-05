document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Firebase Authentication State Observer
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged(user => {
            const userStateContainer = document.getElementById('user-state');
            if (userStateContainer) {
                if (user) {
                    // User is signed in
                    const dbRef = firebase.database().ref();
                    dbRef.child('users').child(user.uid).get().then((snapshot) => {
                        let username = 'User'; // Default username
                        if (snapshot.exists()) {
                            username = snapshot.val().username;
                        }
                        userStateContainer.innerHTML = `
                            <li class="user-greeting"><span>Welcome, ${username}</span></li>
                            <li><a href="#" id="logout-btn" class="profile-icon" aria-label="Logout"><i class="fas fa-user-circle"></i></a></li>
                        `;
                        const logoutBtn = document.getElementById('logout-btn');
                        if(logoutBtn) {
                            logoutBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                firebase.auth().signOut().then(() => {
                                    window.location.href = 'login.html';
                                }).catch((error) => {
                                    console.error('Logout Error:', error);
                                });
                            });
                        }
                    }).catch((error) => {
                        console.error(error);
                        userStateContainer.innerHTML = '<li><a href="login.html" class="profile-icon" aria-label="Login"><i class="fas fa-user-circle"></i></a></li>';
                    });
                } else {
                    // User is signed out
                    userStateContainer.innerHTML = '<li><a href="login.html" class="profile-icon" aria-label="Login"><i class="fas fa-user-circle"></i></a></li>';
                }
            }
        });
    } else {
        const userStateContainer = document.getElementById('user-state');
        if (userStateContainer) {
            userStateContainer.innerHTML = '<li><a href="login.html" class="profile-icon" aria-label="Login"><i class="fas fa-user-circle"></i></a></li>';
        }
    }

    // Cart Functionality
    const cartContainer = document.getElementById('cart-container');

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function clearCart() {
        localStorage.removeItem('cart');
    }

    function updateCartCount() {
        const cart = getCart();
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
            if (cart.length > 0) {
                cartCountElement.classList.add('visible');
            } else {
                cartCountElement.classList.remove('visible');
            }
        }
    }

    function addToCart(course) {
        let cart = getCart();
        if (!cart.find(item => item.id === course.id)) {
            cart.push(course);
            saveCart(cart);
            updateCartCount();
        } else {
            alert(`${course.name} is already in your cart.`);
        }
    }

    function removeFromCart(courseId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== courseId);
        saveCart(cart);
        displayCart();
        updateCartCount();
    }

    function displayCart() {
        if (!cartContainer) return;
        let cart = getCart();
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p id="cart-empty-message">Your cart is currently empty.</p>';
        } else {
            let total = 0;
            const cartItemsContainer = document.createElement('div');
            cart.forEach(item => {
                total += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-remove">
                        <button data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            cartContainer.appendChild(cartItemsContainer);
            const cartTotal = document.createElement('div');
            cartTotal.classList.add('cart-total');
            cartTotal.innerHTML = `
                <p>Total: <span>₹${total.toFixed(2)}</span></p>
                <a href="payment.html" class="btn btn-primary">Checkout</a>
            `;
            cartContainer.appendChild(cartTotal);
            cartContainer.querySelectorAll('.cart-item-remove button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const courseId = e.currentTarget.getAttribute('data-id');
                    removeFromCart(courseId);
                });
            });
        }
    }

    const buyButtons = document.querySelectorAll('.course-card .btn-secondary');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.course-card');
            const course = {
                id: card.querySelector('h3').textContent,
                name: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                price: 3999,
                image: card.querySelector('.course-image').src
            };
            addToCart(course);
        });
    });

    if (window.location.pathname.endsWith('cart.html')) {
        displayCart();
    }

    // Clear cart on successful payment
    if (window.location.pathname.endsWith('payment-successful.html')) {
        clearCart();
        updateCartCount();
    }

    // Payment Page Logic
    const paymentTabs = document.querySelectorAll('.payment-method-tab');
    const paymentContents = document.querySelectorAll('.payment-method-content');
    const upiButtons = document.querySelectorAll('.upi-payment-button');
    const qrCodeDisplay = document.getElementById('qr-code-display');
    const qrTimerContainer = document.getElementById('qr-timer-container');
    const upiConfirmationButton = document.getElementById('upi-confirmation-button');
    let qrCodeTimer;

    if (paymentTabs.length > 0) {
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const method = tab.getAttribute('data-method');
                paymentTabs.forEach(t => t.classList.remove('active'));
                paymentContents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`${method}-payment`).classList.add('active');
            });
        });
    }

    function startQrCodeTimer() {
        if (qrCodeTimer) {
            clearInterval(qrCodeTimer);
        }

        let timeLeft = 40;
        qrTimerContainer.textContent = `QR code expires in ${timeLeft}s`;

        qrCodeTimer = setInterval(() => {
            timeLeft--;
            qrTimerContainer.textContent = `QR code expires in ${timeLeft}s`;

            if (timeLeft === 20) {
                window.location.href = 'payment-successful.html';
            }

            if (timeLeft <= 0) {
                clearInterval(qrCodeTimer);
                qrTimerContainer.textContent = 'QR Code Expired';
                qrCodeDisplay.innerHTML = '';
                if (upiConfirmationButton) {
                    upiConfirmationButton.style.display = 'none';
                }
            }
        }, 1000);
    }

    if (upiButtons.length > 0 && qrCodeDisplay) {
        let currentQRCode = null;
        upiButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove selection from other buttons
                upiButtons.forEach(btn => btn.classList.remove('selected'));
                // Select the clicked button
                button.classList.add('selected');

                const upiId = button.getAttribute('data-upi-id');
                qrCodeDisplay.innerHTML = ''; // Clear previous QR code

                if (currentQRCode) {
                    currentQRCode.clear();
                }

                currentQRCode = new QRCode(qrCodeDisplay, {
                    text: upiId,
                    width: 200,
                    height: 200,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                if (upiConfirmationButton) {
                    upiConfirmationButton.style.display = 'block';
                }

                startQrCodeTimer();
            });
        });
    }
    
    updateCartCount();
});
