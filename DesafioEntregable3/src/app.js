import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express()
const PORT = 8080;
const productManager = new ProductManager("product.json")

let productos = [];

app.get("/", (req,res)=> {
    res.send("Hola Mundo")
});

app.get("/products", async (req,res) => {
    const { limit } = req.query;

    try{
        let response = await productManager.getProducts();
        if (limit) {
            let tempArray = response.filter((dat, index) => index < limit);
            // let tempArray = response.map((dat, index) => {
            //     return index < limit && dat;
            //   });
            res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
        } else {
          res.json({ data: response, limit: false, quantity: response.length });
        }
    } catch(err) {
        console.log(err)
    }
})

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
  
    let product = await productManager.getProductsById(pid);
    if (product) {
      res.json({ message: "Success", data: product });
    } else {
      res.json({
        message: "The product doesn`t exist",
      });
    }
  });


app.listen(PORT, () => {
    console.log("serv is running in port" + PORT);
})