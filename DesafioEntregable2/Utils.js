import fs from 'fs';

async function readF(file){
    try{
        let result = await fs.promises.readFile(file, "utf-8");
        let data = await JSON.parse(result);
        return data
    }catch(err){
        console.log(err);
    }
}

async function writeF(file, data){
    try{
        let result = await fs.promises.writeFile(file, JSON.stringify(data));
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