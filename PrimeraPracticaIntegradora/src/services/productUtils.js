// import fs from "fs";
// import path from "path";
// import  {__dirName} from "../utils.js"

// export function obtenerListaDeProductos() {
//   const filePath = path.join(__dirName, "./products.json");
//   const fileContent = fs.readFileSync(filePath, "utf8");
//   const data = JSON.parse(fileContent);

//   return data;
// }

// export function guardarProducto({
//   name,
//   price,
//   thumbnail,
//   description,
//   title,
// }) {
//   const filePath = path.join(__dirName, "./products.json");
//   const fileContent = fs.readFileSync(filePath, "utf8");
//   const data = JSON.parse(fileContent);

//   data.push({
//     name: name,
//     price: price,
//     thumbnail: thumbnail,
//     description: description,
//     title: title,
//   });

//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
// }

import fs from 'fs';
import path from 'path';
import { __dirName}  from '../utils.js';


export function getProductsList () {
    const filePath = path.join(__dirName, './productos.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    return data;
}

export function saveProduct (product) {
    const postMyData = async (data) => {
        try {
          const response = await fetch("http://localhost:8080/api/products/", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const datos = await response.json();
          return datos;
        } catch (err) {
          console.log(err);
        }
      };

    // const filePath = path.join(__dirName, './productos.json')
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    // const data = JSON.parse(fileContent)

    // data.push(product)
    // fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function deleteProduct (pid) {
    const filePath = path.join(__dirName, './productos.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    const index = data.findIndex(product => product.id === pid)
    data.splice(index, 1)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}