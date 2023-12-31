import { Router } from "express";
import{ CartManager } from "../classes/CartManager.js";


const router = Router();
const cartManager = new CartManager("./data/Carts.json")


router.get("/:cid", async (req, res) => {
    let {cid} = req.params;
    try{
        let cart = await cartManager.getCartById(parseInt(cid));
        if(cart){
            res.json({message: "Success",data: cart });
        }else{
        res.status(401).json({message:"The cart does not exists" });
        }
    }catch(error){
        console.log(error)
    }
  });

router.post("/",async (req,res)=>{
    
    try{
        let cart = await cartManager.addCart();
        if(cart){
            res.json({message: "Succes"});
        }else{
            res.status(400).json({message:"The cart is not created" });
        }
    }catch(error){
        console.log(error)
    }
});

router.post("/:cid/product/:pid",async (req,res)=>{
    let {cid, pid} = req.params;
    try{
        let data = await cartManager.getCartById(parseInt(cid));
        if(data){
            let cart = await cartManager.updateCart(parseInt(cid),parseInt(pid))
            res.json({message: "Cart updated", data:cart });
        }else{
            res.status(401).json({message:"The cart does not exists" });
        }
    }catch(error){
        console.log(error)
    }
});


export default router;