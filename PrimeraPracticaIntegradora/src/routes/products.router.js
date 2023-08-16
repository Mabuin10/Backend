import { Router } from "express";
// import ProductsModel from '../dao/models/products.js';
import {getAll, getById, save, updateProduct, deleteProduct} from "../dao/dbManagers/products.js"

const router = Router();
//const productManager = new ProductManager('productos.json');
// let productos = [];

// router.get ("/",async (req,res)=>{
//     const { limit } = req.query;

//     if (limit) {
//         let response = await Products.getAll().limit(limit);
//         res.json({message:'productos encontrados', data: response})
//         } else {
//             let response = await Products.getAll()
//             if (response.length === 0) {
//                 res.json({message: 'no hay productos', data: response})
//             } else {
//                 res.json({message: 'todos los productos', data: response})
//             }
//     }

// });
router.get("/productos", async (req, res) => {
    const Productos = await getAll();
  
    res.render("products", { Productos });
  });
  router.get("/", async (req, res) => {
    try {
      const respuesta = await getAll();
      res.json({ message: "Aqui mostrara los productos", data: respuesta });
    } catch (err) {
      res.json({ message: "algo  ha pasado revisa los datos por favor." });
    }
  });


router.get ("/:pid",async (req,res)=>{
    const { pid } = req.params
    let producto = await getById(pid)
    return res.json({message: 'producto encontrado', data: producto});
})


router.post ("/agregarProducto", async (req, res)=>{
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    if ( !title || !description || !code || !price || !stock || !category){
        res.json ({message: "faltan datos"})
    } else {
        const productoNuevo ={
        title : title,
        description : description,
        code : code, 
        price : +price,
        status : true, 
        stock : +stock, 
        category : category,
        thumbnail : thumbnail
        }

        let result = await save([productoNuevo])
        return res.status(201).json({message: "Producto agregado", data : result})
    }
})

router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const {price} = req.body;
    
    if (!price) {
      return res.status(500).json({message : "Faltan datos"})
    } else {
        const producto = {
            price : price
        }

        let result = await updateProduct(pid, producto)
        return res.json({message: 'producto actualizado', data: result})
    }
});

router.delete ("/:pid", async (req,res)=>{
    const {pid} = req.params;
    let result = await deleteProduct(pid)
    if (result === null ){
        return res.status(404).json({message: "Producto no encontrado"})
    } else {
        res.json({message: "producto eliminado", data: result})
    }
})

export default router;