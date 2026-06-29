// ===================================
// Nature Alive Artistry
// Clean Script v2.0
// Part 1
// ===================================

console.log("Nature Alive Artistry Loaded");

// ==========================
// Sidebar Menu
// ==========================

function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// ==========================
// Product Dropdown
// ==========================

function toggleProducts() {
    document.getElementById("productsMenu").classList.toggle("show");
}

// ==========================
// Shopping Cart Open / Close
// ==========================

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

// ==========================
// Local Storage Cart
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// Save Cart
// ==========================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// Update Cart
// ==========================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalBox = document.getElementById("total");

    if (!cartItems || !cartCount || !totalBox) return;

    cartItems.innerHTML = "";

    let total = 0;
    let totalQty = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
        "<p>Your cart is empty.</p>";

    }

}

// ==========================
// Add To Cart
// ==========================

function addToCart(name, price, image = "") {

    let existing = cart.find(item => item.name === name);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });

    }

    saveCart();
    updateCart();

}

// ==========================
// Update Cart Items
// ==========================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalBox = document.getElementById("total");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let totalQty = 0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

    }

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        totalQty += item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

           <img src="${item.image}" class="cart-image">
           
            <h4>${item.name}</h4>

            <p>₹${item.price}</p>

            <div class="qty-box">

                <button onclick="changeQty(${index},-1)">−</button>

                <span>${item.qty}</span>

                <button onclick="changeQty(${index},1)">+</button>

            </div>

            <button onclick="removeItem(${index})">

            🗑 Remove

            </button>

            <hr>

        </div>

        `;

    });

    cartCount.innerText = totalQty;

    totalBox.innerText = total;

}

// ==========================
// Quantity
// ==========================

function changeQty(index,value){

    cart[index].qty += value;

    if(cart[index].qty<=0){

        cart.splice(index,1);

    }

    saveCart();

    updateCart();

}

// ==========================
// Remove
// ==========================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCart();

}

updateCart();

// ==========================
// WhatsApp Order
// ==========================

function sendWhatsAppOrder(){

    if(cart.length===0){
        alert("Your cart is empty!");
        return;
    }

    let total=0;

    let message="🌿 Nature Alive Artistry\n\n";
    message+="Hello,\nI want to order:\n\n";

    cart.forEach(item=>{

        total += item.price*item.qty;

        message +=
`🪴 ${item.name}
Qty : ${item.qty}
Price : ₹${item.price}

`;

    });

    message += `Total : ₹${total}`;

    window.open(
        "https://wa.me/918827912333?text="+encodeURIComponent(message),
        "_blank"
    );

}

// ==========================
// Image Popup
// ==========================

const popup=document.getElementById("imagePopup");
const popupImg=document.getElementById("popupImg");

if(popup && popupImg){

document.querySelectorAll(".product-card img").forEach(img=>{

img.addEventListener("click",()=>{

popup.style.display="flex";

popupImg.src=img.src;

});

});

const close=document.querySelector(".close");

if(close){

close.onclick=function(){

popup.style.display="none";

}

}

window.addEventListener("click",function(e){

if(e.target===popup){

popup.style.display="none";

}

});

}