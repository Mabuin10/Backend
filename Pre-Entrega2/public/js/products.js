function addToCart(id, product) {
    alert (id)
    const carrito = fetch("/api/carts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
        });
    const carritoId = carrito._id

    postCart(id, carritoId)
      .then((dato) => {
        alert("producto agregado al carrito", dato);
      })
      .catch((err) => console.log(err, "no se agrego el producto "));
  }
  
  async function postCart(id, carritoId) {
    try {
      const response = await fetch(`/api/cart/${carritoId}/products/${id}`, {
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
    // let carrito = "hardcodeado funiona";
    postCart(idProduct, carrito)
      .then((dato) => {
        alert("producto agregado al carrito", dato);
      })
      .catch((err) => console.log(err, "no se agrego el producto "));
  }