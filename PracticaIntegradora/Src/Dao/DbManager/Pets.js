import PetsModel from "../Models/Pets.js";

export default class Pets {
  async getAll() {
    return await PetsModel.find({}).lean();
  }
  async getById(id) {
    return await PetsModel.find({ _id: id });
  }

  async save(data) {
    const respuesta = PetsModel.create(data);
    return respuesta;
  }

  update = async (id, data) => {
    const respuesta = PetsModel.findByIdAndUpdate(id, data);
    return respuesta;
  };
  delete = async (id, data) => {
    const respuesta = PetsModel.findByIdAndDelete(id);
    return respuesta;
  };
}