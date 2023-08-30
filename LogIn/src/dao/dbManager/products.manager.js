import ProductsModel from "../models/products.js";


const getAll = async () => {
    const response = await ProductsModel.find().lean()
    return response
}
const getAllWFilters = async (obj) => {
    const { limit, page, query, sort } = obj

    const response = await ProductsModel.paginate({}, { limit: limit, page: page })
    return response;
}

const getById = async (id) => {
    const response = await ProductsModel.findById(id)
    return response
}

const save = async (product) => {
    await ProductsModel.create(product)
    return product
}

const updateProduct = async (id, product) => {
    await ProductsModel.findByIdAndUpdate(id, product)
    return product
}

const deleteProduct = async (id) => {
    const response = await ProductsModel.findByIdAndDelete(id)
    return response
}


export {getAll,getAllWFilters, getById, save, updateProduct, deleteProduct}