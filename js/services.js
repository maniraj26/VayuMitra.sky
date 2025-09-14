// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Update cart count in navigation
function updateCartCount() {
    const cartLink = document.getElementById('cart');
    cartLink.textContent = `Cart (${cart.length})`;
}

// Initialize cart count
updateCartCount();

// Add event listeners to add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        const card = e.target.closest('.item-card');
        const item = {
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent,
            quantity: 1
        };
        addToCart(item);
    });
});

// View details functionality
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function(e) {
        const card = e.target.closest('.item-card');
        const itemName = card.querySelector('h3').textContent;
        alert(`More options for ${itemName} will be displayed here`);
    });
});

// Upload prescription functionality
const uploadPrescriptionBtn = document.querySelector('.upload-prescription');
if (uploadPrescriptionBtn) {
    uploadPrescriptionBtn.addEventListener('click', function() {
        alert('Prescription upload feature will be implemented here');
    });
}

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = '../user-login.html';
}

// Logout functionality
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '../../index.html';
});
