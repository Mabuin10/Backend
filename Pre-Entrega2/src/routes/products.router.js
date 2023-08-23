import { Router } from "express";
// import ProductsModel from '../dao/models/products.js';
import {getAll, getById, save, updateProduct, deleteProduct} from "../dao/dbManagers/products.manager.js"

const router = Router();

// Método asyncrono para obtener todos los productos
router.get("/allproducts", async (req, res) => {
    try {
      const products = await getAll();
      res.json({ message: "success", products: products });
    } catch (err) {
      res.status(500).json({
        message: "Error al obtener los productos",
        data: err,
      });
    }
  });
  
  router.get("/", async (req, res) => {
    const { limit } = req.query;
    try {
      const response = await getAll();
      if (limit) {
        let tempArray = response.slice(0, limit);
        res.render("products", { products: tempArray });
      } else {
        res.render("products", { products: response });
      }
    } catch (err) {
      res.render({ message: "Error al obtener los productos", data: err });
    }
  });
  
  // Método asyncrono para obtener un producto
  router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await getById(pid);
      if (product) {
        res.json({ message: "success", products: product });
      } else {
        res.status(404).json({
          message: "Producto no encontrado",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error al obtener el producto",
        data: err,
      });
    }
  });
  
  //Metodo asyncrono para guardar un producto
  router.post("/", async (req, res) => {
    let codeExist;
    try {
      let products = await getAll();
      codeExist = products.find((product) => product.code === code);
    } catch (err) {
      console.log(err);
    }
  
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
  
    if (!title || !description || !price || !code || !stock) {
      res.status(400).json({ message: "Faltan datos" });
    }
  
    if (codeExist) {
      res.status(400).json({ message: "El código ya existe" });
    } else {
      let product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: !thumbnails ? "" : thumbnails,
      };
      try {
        await save(product);
        res.json({ message: "Producto creado con éxito", data: product });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error al crear el producto", data: err });
      }
    }
  });
  
  // Método asyncrono para actualizar un producto
  router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const data = req.body;
    try {
      if (Object.keys(data).length === 0) {
        res.status(400).json({ message: "Faltan datos" });
      } else {
        await updateProduct(pid, data);
        res.json({
          message: "Producto modificado con éxito",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Error al modificar el producto",
        data: err,
      });
    }
  });
  
  //Metodo asyncrono para eliminar un producto
  router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const respuesta = await deleteProduct(pid);
      if (respuesta) {
        res.json({
          mensaje: "Producto eliminado con éxito",
          producto: respuesta,
        });
      } else {
        res.status(404).json({ mensaje: "Producto no encontrado" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ mensaje: "Error al eliminar el producto", err: err });
    }
  });
  
  export default router;
  
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
// router.get("/productos", async (req, res) => {
//     const products = await getAll();
//     console.log("Aca traigo products", products);

//     res.render("products", { products });
//   });
//   router.get("/", async (req, res) => {
//     try {
//       const respuesta = await getAll();
//       res.json({ message: "Aqui mostrara los productos", data: respuesta });
//     } catch (err) {
//       res.json({ message: "algo  ha pasado revisa los datos por favor." });
//     }
//   });


// router.get ("/:pid",async (req,res)=>{
//     const { pid } = req.params
//     let producto = await getById(pid)
//     return res.json({message: 'producto encontrado', data: producto});
// })


// router.post ("/agregarProducto", async (req, res)=>{
//     const { title, description, code, price, stock, category, thumbnail } = req.body;
//     if ( !title || !description || !code || !price || !stock || !category){
//         res.json ({message: "faltan datos"})
//     } else {
//         const productoNuevo ={
//         title : title,
//         description : description,
//         code : code, 
//         price : +price,
//         status : true, 
//         stock : +stock, 
//         category : category,
//         thumbnail : thumbnail
//         }

//         let result = await save([productoNuevo])
//         return res.status(201).json({message: "Producto agregado", data : result})
//     }
// })

// router.put("/:pid", async (req, res) => {
//     const { pid } = req.params;
//     const {price} = req.body;
    
//     if (!price) {
//       return res.status(500).json({message : "Faltan datos"})
//     } else {
//         const producto = {
//             price : price
//         }

//         let result = await updateProduct(pid, producto)
//         return res.json({message: 'producto actualizado', data: result})
//     }
// });

// router.delete ("/:pid", async (req,res)=>{
//     const {pid} = req.params;
//     let result = await deleteProduct(pid)
//     if (result === null ){
//         return res.status(404).json({message: "Producto no encontrado"})
//     } else {
//         res.json({message: "producto eliminado", data: result})
//     }
// })

// export default router;