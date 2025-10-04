// Filter button functionality for service pages
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.item-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Quantity selector logic for all service pages
document.querySelectorAll('.decrease-qty').forEach(btn => {
    btn.addEventListener('click', function() {
        const qtyInput = btn.parentElement.querySelector('.quantity-display');
        let qty = parseInt(qtyInput.value) || 1;
        if (qty > 1) qty--;
        qtyInput.value = qty;
    });
});
document.querySelectorAll('.increase-qty').forEach(btn => {
    btn.addEventListener('click', function() {
        const qtyInput = btn.parentElement.querySelector('.quantity-display');
        let qty = parseInt(qtyInput.value) || 1;
        qty++;
        qtyInput.value = qty;
    });
});
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
// Support both .add-to-cart and .add-to-cart-btn, and get quantity if present
document.querySelectorAll('.add-to-cart, .add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only add the clicked item to cart
        const card = e.target.closest('.item-card, .food-item, .Grocery-item, .Medicine-item');
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        const price = priceText.replace(/[^\d.]/g, '');
        let quantity = 1;
        const qtyInput = card.querySelector('.quantity-display');
        if (qtyInput) quantity = parseInt(qtyInput.value) || 1;
        // Get image src
        let img = '';
        const imgTag = card.querySelector('img');
        if (imgTag) img = imgTag.getAttribute('src');
        const item = { name, price, quantity, img };
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
