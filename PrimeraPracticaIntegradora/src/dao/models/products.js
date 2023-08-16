import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    status : {
        type: Boolean
    },
    stock: {
        type: Number,
        require: true
    },
    category : {
        type : String,
        require : true
    },
    thumbnail: Object,
    code: {
        type: String,
        unique: true,
        require : true
    },
    
    category: String 
})

const ProductsModel = mongoose.model(productsCollection, productsSchema)

export default ProductsModel