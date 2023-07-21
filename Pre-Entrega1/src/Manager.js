import PManager from "./ProductManager.js"
import { __dirName } from "./Utils.js"

const { ProductManager } = PManager

let FirstProducts = new ProductManager("./CelPhones.json")
// Crea un producto en product.json
// FirstProducts.addProduct(
//     "Prueba 2",
//     "Celular 12",
//     2001,
//     "sin imagen",
//     "abc1112",
//     25);

// TRAE TODOS LOS PRODUCTOS
// FirstProducts.getProducts().then((data) => console.log(data))
// TRAE PRODUCTO POR ID
// FirstProducts.getProductsById("364f9bc2-deac-47b7-99ea-ad70dbe7bfb7").then((data) => console.log("get products", data))
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
// .deleteProductById("cf95e4d8-b4be-4019-a206-327a270450fa")
//   .then((data) => console.log("el resultado de la eliminacion es:", data));