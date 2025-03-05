
const Name = document.getElementById('name-of-product');
const Pictures = document.getElementById('pictures-of-product');
const Price = document.getElementById('price-of-product');
const SaveButton = document.getElementById('save-product');
const ManagingControls = document.getElementById('managing-controls');

// PRODUCTS AND LOCAL STORAGE
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// SAVE PRODUCTS TO LOCAL STORAGE
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

//  handle adding or updating a product
function addProduct(name, picture, price, index = null) {
    const products = getProducts();
    const newProduct = { name, picture, price };

    if (index === null) {
        products.push(newProduct); // Add new product
    } else {
        products[index] = newProduct; // Update existing product
    }

    saveProducts(products);
    alert('Product saved successfully!');
    displayProducts();
}

//  delete a product
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1); // Remove the product at the given index
    saveProducts(products);
    alert('Product deleted successfully!');
    displayProducts();
}

// Function to display products in the managing section
function displayProducts() {
    const products = getProducts();
    ManagingControls.innerHTML = ''; // Clear current list

    if (products.length === 0) {
        ManagingControls.innerHTML = '<p class="text-gray-500">No products added yet.</p>';
    } else {
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('p-4', 'border', 'border-gray-200', 'mb-4', 'rounded-md');

            const productName = document.createElement('h3');
            productName.classList.add('text-lg', 'font-semibold', 'text-gray-800');
            productName.textContent = `Product Name: ${product.name}`;

            const productPrice = document.createElement('p');
            productPrice.classList.add('text-gray-700');
            productPrice.textContent = `Price: $${product.price}`;

            const productImage = document.createElement('img');
            productImage.classList.add('w-32', 'h-32', 'object-cover', 'rounded-md');
            productImage.src = product.picture;

            // Edit button
            const editButton = document.createElement('button');
            editButton.classList.add('bg-yellow-500', 'text-white', 'py-1', 'px-3', 'rounded-md', 'hover:bg-yellow-600', 'mr-2');
            editButton.textContent = 'Edit';
            editButton.onclick = () => {
                Name.value = product.name;
                Price.value = product.price;
                Pictures.value = ''; // Clear file input (it can't be set programmatically)
                currentEditIndex = index;
                existingPicture = product.picture; // Store the existing picture URL for later
                displayEditImage(existingPicture); // Show current image for editing
            };

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('bg-red-500', 'text-white', 'py-1', 'px-3', 'rounded-md', 'hover:bg-red-600');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                deleteProduct(index);
            };

            // Append buttons
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('mt-4');
            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(deleteButton);

            // Append elements to productDiv
            productDiv.appendChild(productName);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productImage);
            productDiv.appendChild(buttonDiv);

            ManagingControls.appendChild(productDiv);
        });
    }
}

// Function to display the current image when editing
function displayEditImage(imageUrl) {
    const imagePreviewDiv = document.getElementById('image-preview');
    if (!imagePreviewDiv) {
        const newDiv = document.createElement('div');
        newDiv.id = 'image-preview';
        newDiv.classList.add('my-4');
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.classList.add('w-32', 'h-32', 'object-cover', 'rounded-md');
        newDiv.appendChild(imgElement);
        document.getElementById('admin-panel').appendChild(newDiv);
    } else {
        imagePreviewDiv.querySelector('img').src = imageUrl; // Update the existing preview image
    }
}

// Variable to store the index of the product being edited
let currentEditIndex = null;
let existingPicture = null; // Store the existing picture URL

// Event listener for the save button
SaveButton.addEventListener('click', function () {
    const name = Name.value;
    const picture = Pictures.files[0]; // Get the first selected file
    const price = parseFloat(Price.value);

    if (!name || !price || (currentEditIndex === null && !picture)) {
        alert("Please fill out all fields (name, picture, price).");
        return;
    }

    // If no new image selected, use the existing image URL
    const pictureUrl = picture ? URL.createObjectURL(picture) : existingPicture;

    // Add or update product
    addProduct(name, pictureUrl, price, currentEditIndex);

    // Clear the input fields and reset editing index
    Name.value = '';
    Pictures.value = '';
    Price.value = '';
    currentEditIndex = null; // Reset the editing index
    existingPicture = null; // Reset the existing picture URL
    displayEditImage(''); // Clear the previewed image
});

// Display products when the page loads
window.onload = function () {
    displayProducts();
};
