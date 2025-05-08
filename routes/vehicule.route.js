const express = require("express");

const router = express.Router();

const createvehicule = require("../controller/createVehicule");
const deleVehiculeById = require("../controller/deleteVehiculeById");
const updateVehicukleById = require("../controller/updateVehiculeById");



router.post("", createvehicule);
router.delete("/:id", deleVehiculeById);
router.put("/:id", updateVehicukleById);

module.exports = router;