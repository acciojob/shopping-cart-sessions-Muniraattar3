// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Global cart array
let cart = [];

// On page load, load any saved cart data from sessionStorage.
if (sessionStorage.getItem("cart")) {
  cart = JSON.parse(sessionStorage.getItem("cart"));
}

// Update sessionStorage with the current cart
function updateSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render the product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  
  // Attach event listeners to the "Add to Cart" buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"), 10);
      addToCart(productId);
    });
  });
}

// Render the shopping cart list
function renderCart() {
  // Clear existing items
  cartList.innerHTML = "";
  
  // Create an li element for each product in the cart
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    
    // Optional: Add a "Remove" button for each cart item
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(index));
    li.appendChild(removeBtn);
    
    cartList.appendChild(li);
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    updateSessionStorage();
    renderCart();
  }
}

// Remove a product from the cart by its index
function removeFromCart(index) {
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
    updateSessionStorage();
    renderCart();
  }
}

// Clear the entire cart
function clearCart() {
  cart = [];
  updateSessionStorage();
  renderCart();
}

// Attach event listener to the "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial rendering
renderProducts();
renderCart();
