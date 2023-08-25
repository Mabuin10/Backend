
const cartContainer = document.getElementById('cart-container');


const selectedCartId = window.location.pathname.split('/').pop();


fetch(`/api/carts/${selectedCartId}`)
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Listado de carritos') {
            const cartData = data.data;
            renderCart(cartData);
        }
    })
    .catch(error => console.error('Error al obtener los detalles del carrito:', error));


function renderCart(cartData) {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        const cartItems = cartData.products.map(product => {
            return `<li>${product.productId.name} - Cantidad: ${product.quantity}</li>`;
        });
        cartList.innerHTML = cartItems.join('');
    }
}