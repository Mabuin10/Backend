import { UserModel } from "../Models/Users.js"

export default class Users {
    constructor() {
        console.log(`Working users with Database persistence in mongodb`)
    }
    getAll = async () => {
        //Profe, los usuarios son tomados a partir de un mapeo para ser leídos correctamente
        //en handlebars, puedes hacer un lean solamente en caso de que así lo desees 
        //(como se muestra en el Manager de cursos);
        
        let users = await UserModel.find();
        return users.map(user=>user.toObject())
    }
    saveUser = async (user) => {
        let result = await UserModel.create(user);
        return result;
    }
}