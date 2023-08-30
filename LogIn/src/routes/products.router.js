import { Router } from "express";
// import ProductsModel from '../dao/models/products.js';
import {getAll, getAllWFilters ,getById,save,updateProduct,deleteProduct,} from "../dao/dbManager/products.manager.js";

const router = Router();

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
