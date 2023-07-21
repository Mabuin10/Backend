
import { Router } from "express";

import { __dirName, __fileName } from "../utils.js";
import { GetListProducts } from "../services/productUtils.js";

const realtimeRouter = Router();

realtimeRouter.get("/", (req, res) => {
  const products = GetListProducts();

  res.render("realtimeproducts", { products });
});

export default realtimeRouter;