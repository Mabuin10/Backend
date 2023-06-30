class ProductManager {
    products;
    constructor() {
        this.products = [];

    }
    static contadorId = 0;

    addProduct(title, description, price, thumbnail, code, stock) {

        if(
            title == undefined||
            description == undefined||
            price== undefined||
            thumbnail == undefined||
            code == undefined||
            stock == undefined
        ) {
            throw new Error("Todos los campos son obligatorios");
        }
        let codeExist = this.products.some((dato) => dato.code == code);

        if (codeExist) {
            throw new Error("El codigo ya Existe por favor verificar");
        } else {
            ProductManager.contadorId++
            const newProduct = {
                id: ProductManager.contadorId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products.push(newProduct);
        }
    }

    getProducts() {
        return this.products;

    }

    getProductsById(id) {
        let product = this.products.find(dato => dato.id === id)

        if (product !== undefined) {
            return product;
        } else {
            return "No existe el producto solicitado";
        }
    }
}
let FirstProducts = new ProductManager()
FirstProducts.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25);
// El siguente addProduct tira error de duplicado
// FirstProducts.addProduct(
//     "producto prueba",
//     "Este es un producto de prueba",
//     200,
//     "sin imagen",
//     "abc123",
//     25);
console.log("getProduct: ", FirstProducts.getProducts());
console.log("getProductsById: ", FirstProducts.getProductsById(1))


