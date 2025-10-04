// Grocery/Food/Medicine Add to Cart logic
// This script should be included in all service pages (food.html, grocery.html, medicine.html)
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart button logic
    document.querySelectorAll('.add-to-cart').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const card = e.target.closest('.item-card');
            const name = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            // Extract price as number
            const price = priceText.replace(/[^\d.]/g, '');
            // Get quantity if present
            let quantity = 1;
            const qtyInput = card.querySelector('.quantity-display');
            if (qtyInput) quantity = parseInt(qtyInput.value) || 1;
            // Add item to cart in localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price, quantity });
            localStorage.setItem('cart', JSON.stringify(cart));
            // Optionally update cart count in nav
            const cartNav = document.getElementById('cart');
            if (cartNav) cartNav.textContent = `Cart (${cart.length})`;
        });
    });

    // Quantity controls
    document.querySelectorAll('.decrease-qty').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const qtyInput = btn.parentElement.querySelector('.quantity-display');
            let qty = parseInt(qtyInput.value) || 1;
            if (qty > 1) qty--;
            qtyInput.value = qty;
        });
    });
    document.querySelectorAll('.increase-qty').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const qtyInput = btn.parentElement.querySelector('.quantity-display');
            let qty = parseInt(qtyInput.value) || 1;
            qty++;
            qtyInput.value = qty;
        });
    });
});

// Cart page logic (cart.js)
if (window.location.pathname.includes('cart.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartList = document.getElementById('cartList');
        const cartTotal = document.getElementById('cartTotal');
        const payBtn = document.getElementById('payBtn');
        const qrSection = document.getElementById('qrSection');

        function renderCart() {
            if (cart.length === 0) {
                cartList.innerHTML = '<p>Your cart is empty.</p>';
                cartTotal.textContent = '';
                payBtn.style.display = 'none';
                qrSection.innerHTML = '';
                return;
            }
            cartList.innerHTML = cart.map((item, idx) => `
                <div class="cart-item" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                    <img src="${item.img || '../images/default.png'}" alt="${item.name}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;margin-right:12px;">
                    <span style="flex:1;">${item.name}</span>
                    <span style="flex:1;text-align:center;">₹${item.price}</span>
                    <button class="remove-btn" data-idx="${idx}" style="background:#e53935;color:#fff;border:none;padding:0.3rem 1rem;border-radius:12px;cursor:pointer;">Remove</button>
                </div>
            `).join('');
            // Remove button logic
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.onclick = function() {
                    const idx = parseInt(btn.getAttribute('data-idx'));
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                };
            });
            const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
            cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
            payBtn.style.display = 'block';
        }

        payBtn.onclick = function() {
            const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
            qrSection.innerHTML = `
                <h3>Scan to Pay</h3>
                <img src="../payment QR code.jpg" alt="Payment QR Code" style="max-width:300px; border-radius:16px; box-shadow:0 2px 8px #ccc;">
                <div style="margin-top:8px; font-size:16px; color:#444;">UPI ID: maniraj8540-1@okaxis</div>
                <div style="margin-top:4px; font-size:14px; color:#888;">Scan to pay with any UPI app</div>
                <div style="margin-top:8px; font-size:18px; color:#222; font-weight:bold;">Amount to Pay: ₹${total.toFixed(2)}</div>
            `;
        };

        renderCart();
    });
}
