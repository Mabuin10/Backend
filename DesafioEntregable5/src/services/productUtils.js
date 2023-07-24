import fs from "fs";
import path from "path";
import  {__dirName} from "../utils.js"

export function GetListProducts() {
  const filePath = path.join(__dirName, "./ProductList.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);

  return data;
}

export function SaveProduct({
  id,
  code,
  name,
  price,
  thumbnail,
  description,
  title,
}) {
  const filePath = path.join(__dirName, "./ProductList.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);

  data.push({
    id: id,
    code: code,
    name: name,
    price: price,
    thumbnail: thumbnail,
    description: description,
    title: title,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function DeleteProduct (pid) {
  const filePath = path.join(__dirName, "./ProductList.json")
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileContent)

  const index = data.findIndex(product => product.id === pid)
  data.splice(index, 1)
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}