// Fetch and display products
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/index.html') {
      fetchProducts();
    } else if (window.location.pathname === '/cart.html') {
      fetchCart();
    } else if (window.location.pathname === '/order.html') {
      fetchOrderDetails();
    }
  });
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); // Update with your API URL
      const products = await response.json();
  
      const productsContainer = document.getElementById('products');
      productsContainer.innerHTML = '';
  
      products.forEach(product => {
        const productCard = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
                <button class="btn btn-primary" onclick="addToCart('${product._id}')">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
        productsContainer.innerHTML += productCard;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const addToCart = async (productId) => {
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  
  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart'); // Update with your API URL
      const cart = await response.json();
  
      const cartContainer = document.getElementById('cart');
      cartContainer.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${cart.items.map(item => `
              <tr>
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price}</td>
                <td>$${item.product.price * item.quantity}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart('${item.product._id}')">Remove</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
      alert('Product removed from cart!');
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };
  
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch('/api/orders'); // Update with your API URL
      const order = await response.json();
  
      const orderContainer = document.getElementById('order-details');
      orderContainer.innerHTML = `
        <h3>Order #${order._id}</h3>
        <p><strong>Total Price:</strong> $${order.totalPrice}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <h4>Products:</h4>
        <ul>
          ${order.products.map(p => `<li>${p.product.name} - ${p.quantity} x $${p.product.price}</li>`).join('')}
        </ul>
      `;
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  