
// Food Menu
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
    }
];


// Get Cart Data
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Show Food Menu
function showFoods() {

    let menu = document.getElementById("menuItems");

    menu.innerHTML = "";

    foods.forEach(function(food) {

        menu.innerHTML += `
            <div class="food">

                <img src="${food.image}" alt="${food.name}">

                <h3>${food.name}</h3>

                <p>₹${food.price}</p>

                <button class="add-btn"
                onclick="addToCart(${food.id})">

                     Add to Cart

                </button>

            </div>
        `;

    });

}


// Add Food to Cart
function addToCart(id) {

    let food = foods.find(function(item) {
        return item.id == id;
    });

    let item = cart.find(function(item) {
        return item.id == id;
    });

    if (item) {

        item.quantity++;

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

    updateCart();

    showMessage(food.name + " added to cart!");

}


// Save Cart
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}


// Show Message
function showMessage(message) {

    let box = document.getElementById("message");

    box.innerText = message;

    box.style.display = "block";

    setTimeout(function() {

        box.style.display = "none";

    }, 2000);

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







// Start Website
showFoods();

updateCart();
