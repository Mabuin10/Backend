/*const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("add to cart");
});
*/
function addToCart(id, product) {
  alert (id)
  let carrito = "64e5766ed24a46ef2566ffe8";
  postCart(id, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}

async function postCart(id, carrito) {
  try {
    const response = await fetch(`/api/cart/${carrito}/product/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function increase(idCart, idProduct) {
  console.log(idCart, idProduct);
  let carrito = "64e5766ed24a46ef2566ffe8";
  postCart(idProduct, carrito)
    .then((dato) => {
      alert("producto agregado al carrito", dato);
    })
    .catch((err) => console.log(err, "no se agrego el producto "));
}