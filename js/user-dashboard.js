// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'user-login.html';
}

// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Handle order submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orderType = document.getElementById('orderType').value;
    const description = document.getElementById('description').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const newOrder = {
        id: Date.now(),
        userId: currentUser.email,
        orderType,
        description,
        location: {
            latitude,
            longitude
        },
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    alert('Order placed successfully!');
    updateOrderList();
    e.target.reset();
});

// Update order list in the UI
function updateOrderList() {
    const orderList = document.getElementById('orderList');
    const userOrders = orders.filter(order => order.userId === currentUser.email);
    
    orderList.innerHTML = userOrders.map(order => `
        <div class="order-item ${order.status}">
            <h4>${order.orderType.toUpperCase()}</h4>
            <p>${order.description}</p>
            <p>Location: ${order.location.latitude}, ${order.location.longitude}</p>
            <p>Status: ${order.status}</p>
            <p>Created: ${new Date(order.createdAt).toLocaleString()}</p>
        </div>
    `).join('');
}

// Initialize order list
updateOrderList();

// Handle location auto-fill (using browser's geolocation)
if ("geolocation" in navigator) {
    const locationBtn = document.createElement('button');
    locationBtn.textContent = 'Use Current Location';
    locationBtn.className = 'btn';
    locationBtn.onclick = function(e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
        });
    };
    document.getElementById('orderForm').insertBefore(locationBtn, document.querySelector('button[type="submit"]'));
}
