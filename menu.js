
// Food Items
let foods = [

    {
        id: 1,
        name: "Pizza",
        price: 199,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
    },

    {
        id: 2,
        name: "Burger",
        price: 99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },

    {
        id: 3,
        name: "Pasta",
        price: 149,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500"
    },

    {
        id: 4,
        name: "Sandwich",
        price: 79,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500"
    },

    {
        id: 5,
        name: "French Fries",
        price: 89,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },

    {
        id: 6,
        name: "Chicken Burger",
        price: 159,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500"
    },

    {
        id: 7,
        name: "Momos",
        price: 99,
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500"
    },

    {
        id: 8,
        name: "Cold Coffee",
        price: 89,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    }

];


// Get Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display Food Items
function displayFoods() {

    let foodItems = document.getElementById("foodItems");

    foodItems.innerHTML = "";

    foods.forEach(food => {

        foodItems.innerHTML += `

            <div class="food-card">

                <img src="${food.image}" alt="${food.name}">

                <h3>${food.name}</h3>

                <p>Price: ₹${food.price}</p>

                <button onclick="addToCart(${food.id})">
                    Add to Cart
                </button>

            </div>

        `;

    });

}


// Add to Cart
function addToCart(id) {

    let food = foods.find(item => item.id === id);

    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1

        });

    }

    saveCart();

    document.getElementById("orderMessage").innerText =
        food.name + " added to cart!";

}


// Display Cart
function displayCart() {

    let cartItems = document.getElementById("cartItems");

    let totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "Your cart is empty.";

        totalPrice.innerText = 0;

        return;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <p>Subtotal: ₹${item.price * item.quantity}</p>

                </div>

                <div class="cart-buttons">

                    <button onclick="changeQuantity(${index}, 1)">+</button>

                    <button onclick="changeQuantity(${index}, -1)">-</button>

                    <button onclick="removeItem(${index})">Remove</button>

                </div>

            </div>

        `;

    });

    totalPrice.innerText = total;

}


// Change Quantity
function changeQuantity(index, value) {

    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

}


// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}


// Clear Cart
function clearCart() {

    cart = [];

    saveCart();

    document.getElementById("orderMessage").innerText =
        "Your cart has been cleared!";

}


// Place Order
function placeOrder() {

    if (cart.length === 0) {

        document.getElementById("orderMessage").innerText =
            "Please add food to your cart first!";

        return;

    }

    alert("Your order has been placed successfully!");

    cart = [];

    saveCart();

}


// Save Cart
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// Page Load
displayFoods();

displayCart();
