import { Router } from "express";
import Pets from "../Dao/DbManager/Pets.js";
const router = Router();
const pets = new Pets();

router.get("/mascotas", async (req, res) => {
  const mascotas = await pets.getAll();

  res.render("Pets", { mascotas });
});
router.get("/", async (req, res) => {
  try {
    const respuesta = await pets.getAll();
    res.json({ message: "Aqui mostrara las  mascotas", data: respuesta });
  } catch (err) {
    res.json({ message: "algo  ha pasado revisa los datos por favor." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await pets.getById(id);
    respuesta
      ? res.json({ message: "Encontramos esta mascota", data: respuesta })
      : res.json({
          message: "La mascota solicitada no existe",
          data: respuesta,
        });
  } catch (err) {
    res.json({ message: "algo  ha pasado revisa los datos por favor." });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    data.birthDate = new Date(data.birthDate);
    console.log(data);
    const respuesta = await pets.save(data);
    res.json({ message: "Hemos creado una mascota", data: respuesta });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "algo ha pasado", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.birthDate = new Date(data.birthDate);
    const respuesta = await pets.update(id, data);
    res.json({ message: "Hemos modificado una mascota", data: respuesta });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "algo ha pasado", error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.birthDate = new Date(data.birthDate);
    const respuesta = await pets.delete(id);
    res.json({ message: "Hemos eliminado una mascota", data: respuesta });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "algo ha pasado", error: err });
  }
});
export default router;