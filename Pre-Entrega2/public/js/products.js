function addToCart(id, product) {
    alert (id)
    let carrito = "64e8da8fab89789ad37a41b5";
    postCart(id, carrito)
      .then((dato) => {
        alert("producto agregado al carrito", dato);
      })
      .catch((err) => console.log(err, "no se agrego el producto "));
  }
  
  async function postCart(id, carrito) {
    try {
      const response = await fetch(`/api/cart/${carrito}/products/${id}`, {
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