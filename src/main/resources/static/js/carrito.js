
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
        product.quantity = Math.max(1, sum);
        console.log("quantity: " + product.quantity);
        // Actualiza la visualización de la cantidad y el total
        let quantityDisplay = document.getElementById(`quantity-` + productId);
        if (quantityDisplay) {
            quantityDisplay.textContent = product.quantity;
        }
        sessionStorage.setItem('cart', JSON.stringify(carts));
        updateCartTotal();
    }
}

function updateCartTotal() {
    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];
    let total = carts.reduce((sum, item) => sum + (item.price * (1 - item.discount / 100) * item.quantity), 0);
    let totalDisplay = document.getElementById('cart-total');
    if (totalDisplay) {
        totalDisplay.textContent = total.toFixed(2);
    }
//    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];
//
//   carts.map(function(item){
//     if(item.id == product.id){
//       item.quantity = product.quantity;
//     }
//   });
//    console.log("carts updated: " +JSON.stringify(carts));
//
//    sessionStorage.setItem('cart', JSON.stringify(carts));
}

function removeCartItem(id) {
   // Obtener el carrito del sessionStorage
      let carts = JSON.parse(sessionStorage.getItem('cart')) || [];

      // Filtrar el carrito para eliminar el elemento con el id especificado
      carts = carts.filter(item => item.id !== id);

      // Actualizar el carrito en el sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(carts));

      // Eliminar el elemento visualmente del DOM
      let itemElement = document.getElementById('item-' + id);
      if (itemElement) {
          itemElement.remove();
      }
      // También puedes actualizar el total si es necesario
     updateCartTotal();
}