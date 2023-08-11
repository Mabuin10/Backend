import mongoose from "mongoose";

const petsCollection = "Pets";

const petsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  birthDate: Date,
  adopted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  image: String,
});

const PetsModel = mongoose.model(petsCollection, petsSchema);

export default PetsModel;