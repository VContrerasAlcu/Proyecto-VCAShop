import express from "express";
import { registrarInteresProducto } from "../servicios/hubspot.js";

const router = express.Router();

router.post("/registro-interes", async (req, res) => {
  const { email, producto } = req.body;

  if (!email || !producto?.nombre) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    await registrarInteresProducto(email, producto);
    res.status(200).json({ mensaje: "Interés registrado en HubSpot" });
  } catch (error) {
    console.error("❌ Error al registrar interés:", error.message);
    res.status(500).json({ error: "Error al registrar interés" });
  }
});

export default router;