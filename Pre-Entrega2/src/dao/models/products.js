import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
    price: {
        type: Number,
        required: true
    },
    status : Boolean,
    stock: {
        type: Number,
        require: true
    },
    category : {
        type : String,
        require : true
    },
    thumbnail: {Object},
    code: {
        type: String,
        unique: true,
        require : true
    }
})
productsSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model(productsCollection, productsSchema)

export default ProductsModel