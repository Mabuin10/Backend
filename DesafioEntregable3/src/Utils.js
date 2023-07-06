import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



export const __fileName = fileURLToPath(import.meta.url);
export const __dirName = dirname(__fileName)

async function readF(file){
    try{
        let result = await fs.promises.readFile(__dirName + "/" + file, "utf-8");
        let data = await JSON.parse(result);
        return data
    }catch(err){
        console.log(err);
    }
}

async function writeF(file, data){
    try{
        let result = await fs.promises.writeFile(__dirName + "/" + file, JSON.stringify(data));
        return true
    }catch(err){
        console.log(err);
    }
}

async function deleteF(file) {
    try {
      await fs.promises.unlink(file);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  export default {readF, writeF, deleteF };