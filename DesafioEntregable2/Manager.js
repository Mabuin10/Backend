import PManager from "./ProductManager.js"

const { ProductManager } = PManager

let FirstProducts = new ProductManager("./product.json")
// FirstProducts.addProduct(
//     "producto prueba",
//     "Este es un producto de prueba",
//     200,
//     "sin imagen",
//     "abcd12",
//     25);

// TRAE TODOS LOS PRODUCTOS
// FirstProducts.getProducts().then((data) => console.log("get products", data))
// TRAE PRODUCTO POR ID
// FirstProducts.getProductsById("81ba8989-d808-4242-94ca-e3739c6e930e").then((data) => console.log("get products", data))
// ACTUALIZA EL PRODUCTO
// FirstProducts
//   .updateProductById("81ba8989-d808-4242-94ca-e3739c6e930e", {
//     title: "producto actualizado",
//     description: "p act con descr ",
//     price: 400,
//     thumbnail: "sin imagen",
//     code: "p actualizado",
//   })
//   .then((data) => console.log("resultado", data));

// ELIMINA EL PRODUCTO
.deleteProductById("81ba8989-d808-4242-94ca-e3739c6e930e")
  .then((data) => console.log("el resultado de la eliminacion es:", data));