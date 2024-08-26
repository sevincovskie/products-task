document.addEventListener("DOMContentLoaded", function() {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const addProductBtn = document.getElementById('addProductBtn');
    const productList = document.getElementById('productList');
    const totalProducts = document.getElementById('totalProducts');
    const totalPrice = document.getElementById('totalPrice');
    
    let products = JSON.parse(localStorage.getItem('products')) || [];

    addProductBtn.addEventListener('click', function() {
        addProduct(products);
    });

    window.deleteProduct = function(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
    };

    renderProducts(products);

    function renderProducts(products) {
        productList.innerHTML = '';
        let totalSum = 0;

        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${product.name} (${product.price} AZN) 
                            <button onclick="deleteProduct(${index})">Sil</button>`;
            productList.appendChild(li);
            totalSum += parseFloat(product.price);
        });

        totalProducts.textContent = products.length;
        totalPrice.textContent = totalSum;
    }

    function addProduct(products) {
        const name = productNameInput.value.trim();
        const price = productPriceInput.value.trim();

        if (!name || !price) {
            alert('Xahiş edirik, bütün xanalari doldurun.');
            return;
        }

        const product = { name, price };
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
        productNameInput.value = '';
        productPriceInput.value = '';
    }

    
});
