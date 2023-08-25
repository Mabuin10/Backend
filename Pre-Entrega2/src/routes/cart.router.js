import { Router } from "express";
import Carts from "../dao/dbManager/carts.manager.js";
import { getById } from "../dao/dbManager/products.manager.js"


const router = Router();
const carts = new Carts();

router.get("/", async (req, res) => {
    const {limit} = req.query;
    try{
        let response = await carts.getAll();
        if(limit){
            let tempArray = response.filter((dat, index) => index < limit)
            res.json({carts: tempArray, limit: limit,quantity: tempArray.length});
        }else{
        res.json({carts: response});
        }
    }catch(error){
        console.log(error)
    }
});

router.get("/:cid", async (req, res) => {
    let {cid} = req.params;
    try{
        let cart = await carts.getById(cid);

        
        if(cart){
            const productsWithDetails = [];
            for (const item of cart.products) {
                const productDetails = await getById(item.id);
                productsWithDetails.push({
                    product: productDetails,
                    quantity: item.quantity
                });
            }

            
            res.render("cart",{cart:productsWithDetails, cid: cid });
        }else{
        res.status(404).json({message:"The cart does not exists" });
        }
    }catch(error){
        console.log(error)
    }
});

router.post("/",async (req,res)=>{
    
    try{
        let cart = await carts.save();
        if(cart){
            res.json({message: "Cart created"});
            console.log(cart)
        }else{
            res.status(400).json({message:"The cart couldn't be created" });
        }
    }catch(error){
        console.log(error)
    }
});

//Método asyncrono para agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    //console.log("he recibido algo", cid, pid);
  
    try {
      //el carrito esta vacio?
  
      const cart = await carts.getById(cid);
      cart.products.forEach((product) => console.log(product));
      let productExistsInCart = cart.products.findIndex(
        (dato) => dato.product == pid
      );
      productExistsInCart == -1
        ? cart.products.push({
            product: pid,
            quantity: 1,
          })
        : (cart.products[productExistsInCart].quantity =
            cart.products[productExistsInCart].quantity + 1);
  
      const result = await carts.update(cid, cart);
  
      const updatedCart = await carts.getById(cid);
      console.log(updatedCart);
  
      res.json({ message: "Carrito actualizado con éxito", data: updatedCart });
    } catch (err) {
      res.status(500).json({
        message: "Error al actualizar el carrito",
        data: err,
      });
    }
  });

router.delete("/:cid/products/:pid",async(req,res)=>{
    const {cid,pid} = req.params
    let cart = await carts.getById(cid);
    let products = cart.products
    let existsPindex = products.findIndex((producto) => producto.id === pid);
    if(existsPindex!== -1){
      products.splice(existsPindex,1)
      await carts.save(cart);
      return res.json({ message: "Product removed from cart" });
    }else{
      return res.status(404).json({message: "Product not found"})
    }
})

router.put("/:cid/add-products", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        let cart = await carts.getById(cid);
        cart.products = [...cart.products, ...products]; // Agregar los nuevos productos
        await carts.save(cart);
        return res.json({ message: "Products added to cart", data: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.put("/:cid/products/:pid",async(req,res)=>{
     const {cid,pid} = req.params
     const {quantity} = req.body
     let cart = await carts.getById(cid)
     let product = cart.products
     let existsPindex = product.findIndex((producto) => producto.id === pid);
     if(existsPindex!== -1){
     product[existsPindex].quantity = quantity
     let updatedCart = await carts.save(cart);
    console.log(updatedCart)
     const productsWithDetails = [];
            for (const item of updatedCart.products) {
                const productDetails = await getById(item.id);
                productsWithDetails.push({
                    product: productDetails,
                    quantity: item.quantity
                });
            }
         
    return res.json({ message: "Product updated" });


     }else{
      return res.status(404).json({message: "Product not found"})
     }
})


router.delete("/:cid",async(req,res)=>{
    const {cid} = req.params
    let cart = await carts.getById(cid)
    cart.products = []
    await carts.save(cart);
    return res.json({message: "Cart updated"})
})

export default router;