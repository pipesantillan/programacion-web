
let cart = JSON.parse(localStorage.getItem('tennisCart')) || [];
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
});


function addToCart(name, price) {
    const item = {
        name: name,
        price: price,
        quantity: 1
    };


    const existingItem = cart.find(cartItem => cartItem.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }


    localStorage.setItem('tennisCart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();


    const toast = new bootstrap.Toast(document.getElementById('cartToast'), {
        delay: 2000 
    });
    toast.show();
}


function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems.toString();
    }
}


function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small>$${item.price} x ${item.quantity}</small>
                </div>
                <div>
                    <span class="me-2">$${itemTotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">×</button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2);
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('tennisCart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}


function clearCart() {
    cart = [];
    localStorage.setItem('tennisCart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}


function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    clearCart();
    

    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    modal.hide();
}