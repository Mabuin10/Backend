import { Router } from "express";
import { getAll } from "../dao/dbManager/products.manager.js";
import cartsModel from "../dao/models/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await getAll()
        res.render("realtimeproducts", { products })
    }
    catch (err) {
        res.render("realtimeproducts", `Ha ocurrido un error! ${err}`)
    }
})

router.get("/products", async (req, res) => {
    try {
        const products = await getAll()
        res.render("products", { products })
    }
    catch (err) {
        res.json({ message: "Algo salio mal!", err: err })
    }
})

router.get("/cart/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartsModel.findOne({ _id: cid }).populate('products.product')
        const modifiedProducts = cart.products.map(item => ({
            title: item.product.title,
            quantity: item.quantity,
            id: item.product._id
        }));
        res.render("carts", { cid: cid, products: modifiedProducts })
    }
    catch (err) {
        res.json({ message: "Algo salio mal al traer el carrito", error: err })
        console.log(err)
    }
})

export default router