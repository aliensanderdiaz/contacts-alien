const contactos = require("./contactos");
const Contacto = require("./contacto.model");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json())
app.use(cors())

app.get("/guardar-contactos", async (req, res) => {
  await Contacto.deleteMany({});
  await Contacto.insertMany(contactos);
  res.json({
    ok: true,
  });
});

app.get("/contactos", async (req, res) => {
  const contactos = await Contacto.find({ deleted: false })
  res.json({
    ok: true,
    contactos
  });
});

app.post("/contactos/:id", async (req, res) => {
  const contacto = await Contacto.findByIdAndUpdate(req.params.id, req.body)
  res.json({
    ok: true,
    contacto
  });
});

app.delete("/contactos/:id", async (req, res) => {
  const contacto = await Contacto.findByIdAndUpdate(req.params.id, {deleted: true})
  res.json({
    ok: true,
    contacto
  });
});

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    app.listen(3000, () => {
      console.log("App running");
    });
  })
  .catch(() => {
    console.log("No conectado a la base de datos");
  });
