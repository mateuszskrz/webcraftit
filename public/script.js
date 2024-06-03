document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display products
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            if (productList) {
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    productDiv.innerHTML = `
                        <img src="images/${product.image}" alt="${product.name}" class="product-image">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Cena: $${product.price}</p>
                        <button onclick="addToCart(${product.id})">Dodaj do koszyka</button>
                    `;
                    productList.appendChild(productDiv);
                });
            }
        });

    // Display cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCart(cart);

    // Clear cart button
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            displayCart([]);
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Perform login logic (dummy check here)
            if (username === 'admin' && password === 'password') {
                alert('Zalogowano pomyślnie');
            } else {
                alert('Błędna nazwa użytkownika lub hasło');
            }
        });
    }
});

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(cart);
}

function displayCart(cart) {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    if (cartList) {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="images/${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p>Cena: $${product.price}</p>
            `;
            cartList.appendChild(productDiv);
            total += product.price;
        });
        if (cartTotal) {
            cartTotal.innerText = `Aktualna wartość koszyka razem: $${total}`;
        }
    }
}
