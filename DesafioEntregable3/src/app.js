import express from "express";
import PManager from "./ProductManager.js"

const {ProductManager} = PManager
const app = express()
const PORT = 8080;
const productManager = new ProductManager("./product.json")

app.get("/", (req,res)=> {
    res.send("Hola Mundo")
})


app.listen(PORT, () => {
    console.log("servidor esta running en el puerto" + PORT);
})