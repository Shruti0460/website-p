// Initialize an empty cart
let cart = [cart];

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
  // Check if item is already in the cart
  let item = cart.find(i => i.name === itemName);
  
  if (item) {
    // If item is already in the cart, increase quantity
    item.quantity += 1;
  } else {
    // If item is not in the cart, add it
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }

  // Save the cart to localStorage (so data persists when the page is reloaded)
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart display
  updateCart();
}

// Function to update the cart display
function updateCart() {
  // Get the cart from localStorage
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Display cart items on the cart page
  let cartItemsList = document.getElementById('cartItems');
  cartItemsList.innerHTML = ''; // Clear previous list

  let totalPrice = 0;

  // Loop through the cart and display each item
  cart.forEach(item => {
    let listItem = document.createElement('li');
    listItem.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
    cartItemsList.appendChild(listItem);

    totalPrice += item.price * item.quantity;
  });

  // Update the total price on the cart page
  let totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `Total: $${totalPrice}`;
}

// Handle checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get user input from the checkout form
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  // Confirm the order and redirect to the order confirmation page
  alert(`Thank you, ${name}! Your order will be delivered to ${address}.`);
  localStorage.removeItem('cart'); // Clear the cart
  window.location.href = 'orderConfirmation.html'; // Redirect to confirmation page
});

// When the page loads, update the cart if any items are stored in localStorage
window.onload = function () {
  updateCart();
};
