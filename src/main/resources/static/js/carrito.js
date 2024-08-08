
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
        updateItemCartTotal(productId);
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

function updateItemCartTotal(itemId) {
    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];
    console.log(JSON.stringify(carts))
    let itemIdStr = String(itemId).trim();
    let filteredItems = carts.filter(item => item.id === itemIdStr);
    console.log(JSON.stringify(filteredItems))
    let total = filteredItems.reduce((sum, item) => sum + (item.price * (1 - item.discount / 100) * item.quantity), 0);
    let totalDisplay = document.getElementById('item-total-' + itemId);
    if (totalDisplay) {
        totalDisplay.textContent = "Total: " + total.toFixed(2);
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
    console.log("actualizando el numero " )
    updateCartIcon();
    updateCartTotal();
    chargeQuantity();
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartData.forEach(item => {
        console.log("actualizando el numero " + item.id + ", " + item.quantity)
        updateItemCartTotal(item.id)
    })
});

/* #################################### Pago de carrito */
 document.getElementById("btnStep1").addEventListener("click", function() {
            this.classList.add('hidden');
            document.getElementById("btnStep2").classList.remove('hidden');
            document.getElementById("step2").classList.remove('hidden');
            document.getElementById("step1").classList.add('hidden');

        });

        document.getElementById("btnStep2").addEventListener("click", function() {
            this.classList.add('hidden');
            document.getElementById("step3").classList.remove('hidden');
            document.getElementById("step2").classList.add('hidden');
            document.getElementById("delivery-details").classList.add('hidden');
            document.getElementById("pickup-details").classList.add('hidden');
        });



function showPickupDetails() {

    document.getElementById("pickup-details").classList.remove('hidden');
    document.getElementById("delivery-details").classList.add('hidden');
}

function showDeliveryDetails() {
    document.getElementById("pickup-details").classList.add('hidden');
    document.getElementById("delivery-details").classList.remove('hidden');
    // Add logic to calculate and add the delivery fee to the total amount
}

document.getElementById("local").addEventListener("change", function() {
    if (this.checked) {
       showPickupDetails();
    }
});

document.getElementById("casa").addEventListener("change", function() {
    if (this.checked) {
       showDeliveryDetails();
    }
});

/* ################### Mapa de google para el envio */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -27.451, lng: -58.986},
        zoom: 13,
        restriction: {
            latLngBounds: {
                north: -27.4,
                south: -27.5,
                east: -58.95,
                west: -59.02
            },
            strictBounds: true
        }
    });
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: {lat: -27.451, lng: -58.986}
    });

    marker.addListener('position_changed', function() {
        var pos = marker.getPosition();
        console.log('Selected location: ', pos.lat(), pos.lng());
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    initMap();
});

