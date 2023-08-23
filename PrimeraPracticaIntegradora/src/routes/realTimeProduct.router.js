
import { Router } from "express";

import { __dirName, __fileName } from "../utils.js";
import {getProductsList } from "../services/productUtils.js";
import {getAll} from "../dao/dbManagers/products.js"

const realtimeRouter = Router();


// realtimeRouter.get("/", (req, res) => {
//   const products = getProductsList();

//   res.render("realtimeproducts", { products });
// });

realtimeRouter.get("/", (req, res) => {
    const products = getAll();
      res.render("realtimeproducts", { products });
});
export default realtimeRouter;


