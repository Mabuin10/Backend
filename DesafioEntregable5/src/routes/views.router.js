import { Router } from "express";
import { __dirName, __fileName } from "../utils.js";
import { obtenerListaDeProductos } from "../services/productUtils.js";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  const products = obtenerListaDeProductos();

  res.render("home", { products });
});

export default productRouter;