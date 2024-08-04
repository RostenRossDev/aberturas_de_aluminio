
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


function chargeQuantity() {
    // Encuentra el producto en el carrito
    const carts = JSON.parse(sessionStorage.getItem('cart')) || [];
    console.log("carts: " + JSON.stringify(carts))

    carts.forEach(product => {
        let productIdStr = String(product.id);
        // Actualiza la cantidad, asegurándose de que no sea menor a 1
        console.log("quantity: " + product.quantity);
        // Actualiza la visualización de la cantidad y el total
        let quantityDisplay = document.getElementById(`quantity-` + productIdStr);
        if (quantityDisplay) {
            quantityDisplay.textContent = product.quantity;
        }
    });

}

function updateCartTotal() {
    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];
    let total = carts.reduce((sum, item) => sum + (item.price * (1 - item.discount / 100) * item.quantity), 0);
    let totalDisplay = document.getElementById('cart-total');
    if (totalDisplay) {
        totalDisplay.textContent = total.toFixed(2);
        updateCartIcon();
    }
}

function removeCartItem(id) {
      id = String(id);

   // Obtener el carrito del sessionStorage
      let carts = JSON.parse(sessionStorage.getItem('cart')) || [];
      console.log("id: " + id)
      console.log("datos viejos: " + carts)
      // Filtrar el carrito para eliminar el elemento con el id especificado
      carts = carts.filter(item => item.id !== id);
      console.log("datos nuevos: " + carts)

      // Actualizar el carrito en el sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(carts));
      let updatedCarts = JSON.parse(sessionStorage.getItem('cart'));
      console.log("Datos guardados en sessionStorage: " + JSON.stringify(updatedCarts));

      // Eliminar el elemento visualmente del DOM
      let itemElement = document.getElementById('item-' + id);
      if (itemElement) {
          itemElement.remove();
      }
      // También puedes actualizar el total si es necesario
     updateCartTotal();
}

document.addEventListener('DOMContentLoaded', function() {
    // Función que verifica el carrito en sessionStorage
    function checkCartAndRedirect() {
        // Obtener el carrito del sessionStorage
        let carts = JSON.parse(sessionStorage.getItem('cart')) || [];

        // Verificar si el carrito tiene 1 o menos elementos
        if (carts.length < 1) {
           const form = document.createElement('form');
               form.method = 'GET';
               form.action = '/inicio';
               document.body.appendChild(form);
               form.submit();
        }
    }

    // Llamar a la función al cargar la página
    checkCartAndRedirect();
});


function updateCartIcon(){
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    let quantity = 0;
    if(cartData != null && cartData.length > 0){
        quantity += cartData.reduce((total, item) => total + item.quantity, 0);
    }
    console.log("quantity: " + quantity)
    let totalDisplay = document.getElementsByClassName('cartQuantity');
    console.log("totalDisplay: " +totalDisplay)
    if (totalDisplay) {
        totalDisplay[0].textContent = quantity;
        totalDisplay[1].textContent = quantity;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateCartIcon();
    updateCartTotal();
    chargeQuantity();
});