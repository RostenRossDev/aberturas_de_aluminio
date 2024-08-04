//const mp = new MercadoPago('TEST-878f7a37-a6a4-49b2-86d4-7f42f99412a7', { //public key
//    locale:'es-AR'
//});
//
//const MP = async () => {
//    try {
//        console.log("1")
//
//        const orderData = {
//            title: "bananita",
//            quantity: 1,
//            unit_price: 100,
//        };
//        console.log("2")
//        const response = await fetch("/create_preference", {
//            method: "POST",
//            headers: {
//                "Accept" : "application/json",
//
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify(orderData),
//        });
//        console.log("3")
//        const preference = await response.text(); // Asumiendo que la respuesta es un JSON
//        console.log("4")
//        createCheckoutButton(preference); // Usar el ID de la preferencia
//        console.log("preference: ", preference);
//    } catch (error) {
//        console.log(error)
//        alert("error: " + error);
//    }
//};
//
//const createCheckoutButton = (preferenceId) => {
//    console.log("5")
//
//    const bricksBuilder = mp.bricks();
//    console.log("6")
//
//    const generateButton = async () => {
//        console.log("7")
//
//        if (window.checkoutButton){
//            console.log("7.5")
//            window.checkoutButton.unmount();
//        }
//
//        console.log("8")
//
//        bricksBuilder.create("wallet", "wallet_container", {
//            initialization: {
//                preferenceId: preferenceId,
//            },
//        });
//    };
//
//    console.log("9")
//
//    generateButton();
//};


///* #####################  carrito */

//function addToCart(name, id, price, discount) {
//console.log("agregando al carro: " + name + ", " + id + ", " + price + ", " + discount)
//    fetch('/addToCart', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//        },
//        body: new URLSearchParams({
//            'name': name,
//            'id': id,
//            'price': price,
//            'discount': discount
//        })
//    }).then(() => {
//        updateCartIcon();
//    });
//}

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function addToCart(name, id, price, discount) {
    let carts = JSON.parse(sessionStorage.getItem('cart')) || [];

    const existingItem = carts.find(item => item.id === id);

    if (!existingItem) {
        carts.push({ name, id, price, discount, quantity: 1 });
        sessionStorage.setItem('cart', JSON.stringify(carts));
        console.log(JSON.stringify(cart))
        console.log(cart)
        updateCartIcon();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * (1 - item.discount / 100)) * item.quantity, 0);
}

function sendCartToServer() {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    let cartJSON = JSON.stringify(cartData);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/detalle-de-Compra';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'cart';
    input.value = cartJSON;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
}

document.addEventListener('DOMContentLoaded', () => {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart = cartData;
    updateCartIcon();
});
