
const productContainer = document.getElementById('product-container');

// get products from localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

//  display products in the product container
function displayProducts() {
    const products = getProducts();
    productContainer.innerHTML = ''; // Clear existing products

    if (products.length === 0) {
        productContainer.innerHTML = '<p class="text-gray-500 col-span-3">No products available.</p>';
    } else {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'text-center');

            const productImage = document.createElement('img');
            productImage.classList.add('w-full', 'h-48', 'object-cover', 'rounded-lg');
            productImage.src = product.picture; // Set the image source from the product object

            const productName = document.createElement('h3');
            productName.classList.add('text-lg', 'font-semibold', 'mt-2', 'text-gray-800');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.classList.add('text-gray-600', 'mt-1');
            productPrice.textContent = `$${product.price}`;

            productDiv.appendChild(productImage);
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);

            productContainer.appendChild(productDiv);
        });
    }
}

// Display products when the page loads
window.onload = function () {
    displayProducts();
};
