import { Router } from "express";
import { __dirName, __fileName } from "../utils.js";
import { GetListProducts } from "../services/productUtils.js";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  const products = GetListProducts();

  res.render("home", { products });
});

export default productRouter;