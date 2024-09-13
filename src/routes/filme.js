const express = require("express");
const router = express.Router();
const FilmeController = require("../controllers/filmeController");

router.get("/", FilmeController.listar);
router.post("/", FilmeController.criar);
router.get("/disponiveis", FilmeController.listarDisponiveis);
router.post("/reservar", FilmeController.reservar);
router.post("/:id/confirmar", FilmeController.confirmarLocacao);
router.post("/:id/devolver", FilmeController.devolver);

module.exports = router;
