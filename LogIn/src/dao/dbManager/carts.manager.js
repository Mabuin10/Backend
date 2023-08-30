import CartsModel from "../models/carts.model.js";
import mongoose from "mongoose";

export default class Carts {
    
    async getAll(){
    return await CartsModel.find({}).lean();
    }

    async getById(id){
        const objectId = new mongoose.Types.ObjectId(id);
        return await CartsModel.findOne(objectId);
    }

    async save(data) {
        const respuesta = CartsModel.create(data);
        return respuesta;
    }
    
    async update(id, data){
        const respuesta = CartsModel.findByIdAndUpdate(id, data);
        return respuesta;
    };

    async delete(id){
    const respuesta = CartsModel.findByIdAndDelete(id);
    return respuesta;
    };  

    async removeProduct(cart, pid){
    const updatedProducts = cart.products.filter(item => item.id !== pid);
    cart.products = updatedProducts;
    return cart;
}}