import { Router } from "express";
import { getAll} from "../dao/dbManager/products.manager.js";

const router = Router()

router.get("/", async (req, res) => {
    const products = await getAll()
    res.render("realTimeProducts", { products })
})

export default router;