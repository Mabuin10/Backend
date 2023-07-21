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
    name: name,
    price: price,
    thumbnail: thumbnail,
    description: description,
    title: title,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}