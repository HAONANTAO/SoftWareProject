const express = require("express");

const materialRouter = express.Router();
const materialController = require("../controllers/materialController");
const { ensureAuthorized } = require("../utils/token");

// create a new material
materialRouter.post("/", ensureAuthorized, (req, res) => {
  materialController.postCreateMaterial(req, res);
});

// delete a material
materialRouter.delete("/:id", ensureAuthorized, (req, res) => {
    materialController.deleteMaterial(req, res);
  });

// update a material
materialRouter.put("/:id", ensureAuthorized, (req, res) => {
    materialController.updateMaterial(req, res);
});

// get a material by id
materialRouter.get("/:id", ensureAuthorized, (req, res) => {
    materialController.getOneMaterial(req, res);
});

// get all material
materialRouter.get("/", ensureAuthorized, (req, res) => {
    materialController.getAllMaterial(req, res);
});


//export the router
module.exports = materialRouter;