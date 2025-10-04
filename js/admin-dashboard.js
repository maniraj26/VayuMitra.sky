// Check if admin is logged in
if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'admin-login.html';
}

// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentFilter = 'pending';

// Handle filter buttons
document.querySelectorAll('.order-filters button').forEach(button => {
    button.addEventListener('click', function() {
        currentFilter = this.dataset.filter;
        updateOrdersList();
    });
});

// Ensure orders are loaded fresh each time
function reloadOrders() {
    orders = JSON.parse(localStorage.getItem('orders')) || [];
}

// Update orders list in the UI
function updateOrdersList() {
    reloadOrders();
    const ordersList = document.getElementById('ordersList');
    const filteredOrders = orders.filter(order => order.status === currentFilter);
    
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-item ${order.status}">
            <h4>${order.orderType.toUpperCase()}</h4>
            <p>User: ${order.userId}</p>
            <p>${order.description}</p>
            <p>Location: ${order.location.latitude}, ${order.location.longitude}</p>
            <p>Created: ${new Date(order.createdAt).toLocaleString()}</p>
            ${order.status === 'pending' ? `
                <button class="btn approve-btn" data-id="${order.id}">Approve Order</button>
            ` : order.status === 'approved' ? `
                <button class="btn complete-btn" data-id="${order.id}">Mark as Completed</button>
            ` : ''}
        </div>
    `).join('');

    // Add event listeners to buttons
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            approveOrder(this.dataset.id);
        });
    });

    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            completeOrder(this.dataset.id);
        });
    });
}

// Handle order approval
function approveOrder(orderId) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (order) {
        order.status = 'approved';
        localStorage.setItem('orders', JSON.stringify(orders));
        updateOrdersList();
        
        // Simulate drone dispatch
        simulateDroneDelivery(order);
    }
}

// Handle order completion
function completeOrder(orderId) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (order) {
        order.status = 'completed';
        localStorage.setItem('orders', JSON.stringify(orders));
        updateOrdersList();
    }
}

// Simulate drone delivery
function simulateDroneDelivery(order) {
    // This is a placeholder for drone delivery simulation
    // In a real application, this would communicate with drone control systems
    console.log(`Drone dispatched for order ${order.id}`);
    console.log(`Destination: ${order.location.latitude}, ${order.location.longitude}`);
}

// Initialize orders list
updateOrdersList();

// Auto-refresh orders list every 30 seconds
setInterval(updateOrdersList, 30000);
