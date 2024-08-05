document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromSessionStorage();
});

function filterProducts() {
    const formData = new FormData(document.getElementById('filterForm'));
    const filterData = Object.fromEntries(formData.entries());

    fetch('/administracion-negocio/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData),
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('products', JSON.stringify(data));
        updateProductTable(data);
    });
}

function updateProductTable(products) {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    products.forEach(product => {
        const row = document.createElement('tr');
        row.id = `product-${product.id}`;
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" /></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.discount}</td>
            <td>${product.active ? 'Sí' : 'No'}</td>
            <td>${product.tags.join(', ')}</td>
            <td>${product.stock}</td>
            <td>${product.material}</td>
            <td>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Borrar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editProduct(productId) {
    // Implement your edit logic here
    const row = document.getElementById(`product-${productId}`);
    row.style.backgroundColor = '#f0e68c'; // Change row color to indicate editing
}

function deleteProduct(productId) {
    // Implement your delete logic here
}

function confirmChanges() {
    const updatedProducts = []; // Gather all updated products
    // Implement logic to gather updated products
    fetch('/administracion-negocio/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProducts),
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'success') {
            alert('Cambios confirmados');
            sessionStorage.removeItem('updatedProducts');
        }
    });
}

function loadProductsFromSessionStorage() {
    const products = JSON.parse(sessionStorage.getItem('products')) || [];
    if (products.length > 0) {
        updateProductTable(products);
    }
}