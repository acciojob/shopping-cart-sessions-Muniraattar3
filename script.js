// This is the boilerplate code given for you
// You can modify this code
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
const cartList =document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart =[];

if(sessionStorage.getItem("cart")){
	cart = JSON.parse(sessionStorage.getItem("cart"))
}

function updateSessionStorage() {
	sessionStorage.setItem("cart", JSON.stringify(cart));
}
// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

const buttons = document.querySelectorAll(".add-to-cart-btn");
buttons.forEach((button) =>{
	button.addEventListner("click", () =>{
		const productId =parseInt(button.getAttribute("data-id"), 10);
		addToCart(productId);
	})
})
// Render cart list
function renderCart() {
	cartList.innerHTML ="";

	cart.forEach((item. index)=>{
		const li =document.createElement("li");
		li.textContent =`${item.name} - $${item.price}`;
		
	})
}

// Add item to cart
function addToCart(productId) {
	const product = product.find((p) => p.id === productId);
	if(product){
		cart.push(product);
		updateSessionStorage();
		renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	if(index > -1 && index <cart.length){
		cart.splice(index ,1);
		updateSessionStorage();
		renderCart();
		
	}
}

// Clear cart
function clearCart() {
	cart =[];
	updateSessionStorage();
	renderCart();
	
}

clearCartBtn.addEventListener("click",clearCart);

// Initial render
renderProducts();
renderCart();
