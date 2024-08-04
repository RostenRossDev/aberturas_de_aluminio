
function updateCartIcon() {
    const carts = JSON.parse(sessionStorage.getItem('cart')) || [];

    const cartIcon = document.querySelector('.cart-icon img');
    cartIcon.alt = `Carrito (${carts.length})`;
}

function updateQuantity(productId, change) {
    console.log("productId: " + productId)
    // Encuentra el producto en el carrito
    const carts = JSON.parse(sessionStorage.getItem('cart')) || [];
    console.log("carts: " + JSON.stringify(carts))

    let productIdStr = String(productId);
    let product = carts.find(item => item.id === productIdStr);

    console.log("product: " +JSON.stringify(product));

    if (product) {
        // Actualiza la cantidad, asegurándose de que no sea menor a 1
        const sum =  product.quantity + change;
        console.log( product.quantity + " + " + change + " = " + (product.quantity + change));
        product.quantity = Math.max(1, sum);
        console.log("quantity: " + product.quantity);
        // Actualiza la visualización de la cantidad y el total
        console.log("product incrementado: " +JSON.stringify(product));

        updateCartTotal(product);
    }
}

function updateCartTotal(product) {
    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];

   carts.map(function(item){
     if(item.id == product.id){
       item.quantity = product.quantity;
     }
   });
    console.log("carts updated: " +JSON.stringify(carts));

    sessionStorage.setItem('cart', JSON.stringify(carts));
}

function removeCartItem(id) {
    fetch('/removeCartItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'id': id
        })
    }).then(() => {
        location.reload();
    });
}