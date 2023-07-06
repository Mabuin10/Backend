import utils from "./Utils.js"
import crypto from "crypto" 

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];

    }
    static contadorId = 0;

    async addProduct(title, description, price, thumbnail, code, stock) {

        if (
            title == undefined ||
            description == undefined ||
            price == undefined ||
            thumbnail == undefined ||
            code == undefined ||
            stock == undefined
        ) {
            throw new Error("Todos los campos son obligatorios");
        }
        try {
            let data = await utils.readF(this.path);
            this.products = data?.length > 0 ? data : [];
        } catch (error) {
            console.log(error);
        }

        let codeExist = this.products.some((dato) => dato.code == code);

        if (codeExist) {
            throw new Error("El codigo ya Existe por favor verificar");
        } else {
            ProductManager.contadorId++
            const newProduct = {
                id: crypto.randomUUID(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products.push(newProduct);
            try {
                await utils.writeF(this.path, this.products);
            } catch (error) {
                console.log(error);
            }
        }

    }

    async getProducts() {
        try {
            let data = await utils.readF(this.path);
            return data?.length > 0 ? this.products : "aun no hay registros";
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsById(id) {
        try {
            let data = await utils.readF(this.path);
            this.products = data?.length > 0 ? data : [];
            let product = this.products.find((dato) => dato.id === id);

            if (product !== undefined) {
                return product;
            } else {
                return "no existe el producto solicitado";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductById(id, data) {
        try {
            let products = await utils.readF(this.path);
            this.products = products?.length > 0 ? products : [];

            let productIndex = this.products.findIndex((dato) => dato.id === id);
            if (productIndex !== -1) {
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...data,
                };
                await utils.writeF(this.path, products);
                return {
                    mensaje: "producto actualizado",
                    producto: this.products[productIndex],
                };
            } else {
                return { mensaje: "no existe el producto solicitado" };
            }
        } catch (error) {
            console.log(error);
        }
    }


    async deleteProductById(id) {
        try {
            let products = await utils.readF(this.path);
            this.products = products?.length > 0 ? products : [];
            let productIndex = this.products.findIndex((dato) => dato.id === id);
            if (productIndex !== -1) {
                let product = this.products[productIndex];
                this.products.splice(productIndex, 1);
                await utils.writeF(this.path, products);
                return { mensaje: "Producto Eliminado", producto: product };
            } else {
                return { mensaje: "No existe el producto solicitado" };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
// let FirstProducts = new ProductManager()
// FirstProducts.addProduct(
//     "producto prueba",
//     "Este es un producto de prueba",
//     200,
//     "sin imagen",
//     "abc123",
//     25);
// El siguente addProduct tira error de duplicado
// FirstProducts.addProduct(
//     "producto prueba",
//     "Este es un producto de prueba",
//     200,
//     "sin imagen",
//     "abc123",
//     25);
// console.log("getProduct: ", FirstProducts.getProducts());
// console.log("getProductsById: ", FirstProducts.getProductsById(1))


export default {
    ProductManager
}