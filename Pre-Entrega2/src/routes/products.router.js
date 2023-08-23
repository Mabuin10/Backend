import { Router } from "express";
// import ProductsModel from '../dao/models/products.js';
import {
  getAll,
  getById,
  save,
  updateProduct,
  deleteProduct,
} from "../dao/dbManagers/products.manager.js";

const router = Router();

router.get("/num", async (req, res) => {
  try {
    const products = await getAll();
    console.log(req.query);
    let limit = Number(req.query.limit);
    let category = req.query.category;
    let sort = req.query.sort;

    // Filtrar por categoría si se proporciona

    if (category) {
      products = products.filter((product) => product.category === category);
    }



    // Ordenar los productos
    if (sort) {
      if (sort === "asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        products.sort((a, b) => b.price - a.price);
      }
    }




    //Limite
    if (limit && limit <= products.length) {
      products.splice(limit);
    }




    // Paginación
    let page = Number(req.query.page) || 1;
    let pageSize = Number(req.query.pageSize) || 3;
    let totalPages = Math.ceil(products.length / pageSize);
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    let prods = products.slice(startIndex, endIndex);





    // Construir el objeto de respuesta
    let response = {
      status: "success",
      payload: prods,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink:
        page > 1 ? `/products?page=${page - 1}&pageSize=${pageSize}` : null,
      nextLink:
        page < totalPages
          ? `/products?page=${page + 1}&pageSize=${pageSize}`
          : null,
    };


    res.json(response);
  } catch (error) {
    res.send({
      error: error,
      message: "Se produjo un error al obtener los productos.",
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await getById(pid);
    res.json({ message: "success", data: product });
  } catch (err) {
    res.json({
      message: "El ID buscado no se encontro en la BBDD",
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
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

  const newProduct = {};

  if ((!title, !description, !code, !price, !stock, !category)) {
    res.status(400).send("Faltan datos para poder postear el producto");
  } else {
    (newProduct.title = title),
      (newProduct.description = description),
      (newProduct.code = code),
      (newProduct.price = price),
      (newProduct.status =
        !status || typeof status !== "boolean" ? true : status),
      (newProduct.stock = stock),
      (newProduct.category = category),
      (newProduct.thumbnails = !thumbnails ? [] : thumbnails);
  }

  try {
    const response = await save(newProduct);
    res.json({ message: "Producto Agregado", product: response });
  } catch (err) {
    res.status(500).send("no se pudo agregar");
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

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

    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const response = await updateProduct(pid, newProduct);
    res.json({ message: "success. Producto actualizado", data: response });
  } catch (err) {
    console.log(err);
    res.json({ message: "No se pudo actualizar el producto", error: err });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  const response = await deleteProduct(pid);
  res.json({ message: "success. El producto se ha elimiado", data: response });
});

export default router;

// const router = Router();

// // Método asyncrono para obtener todos los productos
// router.get("/allproducts", async (req, res) => {
//     try {
//       const products = await getAll();
//       res.json({ message: "success", products: products });
//     } catch (err) {
//       res.status(500).json({
//         message: "Error al obtener los productos",
//         data: err,
//       });
//     }
//   });

//   router.get("/", async (req, res) => {
//     const { limit } = req.query;
//     try {
//       const response = await getAll();
//       if (limit) {
//         let tempArray = response.slice(0, limit);
//         res.render("products", { products: tempArray });
//       } else {
//         res.render("products", { products: response });
//       }
//     } catch (err) {
//       res.render({ message: "Error al obtener los productos", data: err });
//     }
//   });

//   // Método asyncrono para obtener un producto
//   router.get("/:pid", async (req, res) => {
//     const { pid } = req.params;
//     try {
//       const product = await getById(pid);
//       if (product) {
//         res.json({ message: "success", products: product });
//       } else {
//         res.status(404).json({
//           message: "Producto no encontrado",
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         message: "Error al obtener el producto",
//         data: err,
//       });
//     }
//   });

//   //Metodo asyncrono para guardar un producto
//   router.post("/", async (req, res) => {
//     let codeExist;
//     try {
//       let products = await getAll();
//       codeExist = products.find((product) => product.code === code);
//     } catch (err) {
//       console.log(err);
//     }

//     const {
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails,
//     } = req.body;

//     if (!title || !description || !price || !code || !stock) {
//       res.status(400).json({ message: "Faltan datos" });
//     }

//     if (codeExist) {
//       res.status(400).json({ message: "El código ya existe" });
//     } else {
//       let product = {
//         title,
//         description,
//         code,
//         price,
//         status,
//         stock,
//         category,
//         thumbnails: !thumbnails ? "" : thumbnails,
//       };
//       try {
//         await save(product);
//         res.json({ message: "Producto creado con éxito", data: product });
//       } catch (err) {
//         res
//           .status(500)
//           .json({ message: "Error al crear el producto", data: err });
//       }
//     }
//   });

//   // Método asyncrono para actualizar un producto
//   router.put("/:pid", async (req, res) => {
//     const { pid } = req.params;
//     const data = req.body;
//     try {
//       if (Object.keys(data).length === 0) {
//         res.status(400).json({ message: "Faltan datos" });
//       } else {
//         await updateProduct(pid, data);
//         res.json({
//           message: "Producto modificado con éxito",
//           data: data,
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         message: "Error al modificar el producto",
//         data: err,
//       });
//     }
//   });

//   //Metodo asyncrono para eliminar un producto
//   router.delete("/:pid", async (req, res) => {
//     const { pid } = req.params;
//     try {
//       const respuesta = await deleteProduct(pid);
//       if (respuesta) {
//         res.json({
//           mensaje: "Producto eliminado con éxito",
//           producto: respuesta,
//         });
//       } else {
//         res.status(404).json({ mensaje: "Producto no encontrado" });
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json({ mensaje: "Error al eliminar el producto", err: err });
//     }
//   });

//   export default router;

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
