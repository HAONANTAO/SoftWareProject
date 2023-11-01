const express = require("express");

const moduleRouter = express.Router();
const moduleController = require("../controllers/moduleController");
const { ensureAuthorized } = require("../utils/token");

// create a new module
moduleRouter.post("/", ensureAuthorized, (req, res) => {
  moduleController.postCreateModule(req, res);
});

// delete a module
moduleRouter.delete("/:id", ensureAuthorized, (req, res) => {
    moduleController.deleteModule(req, res);
  });

// upadte a module
moduleRouter.put("/:id", ensureAuthorized, (req, res) => {
    moduleController.updateModule(req, res);
});

// get a module by id
moduleRouter.get("/:id", ensureAuthorized, (req, res) => {
    moduleController.getOneModule(req, res);
});

// get all module
moduleRouter.get("/", ensureAuthorized, (req, res) => {
    moduleController.getAllModule(req, res);
});

// get all sub module
moduleRouter.get("/subModule/:id", ensureAuthorized, (req, res) => {
    moduleController.getSubModule(req, res);
});

// get all sub module
moduleRouter.get("/materials/:id", ensureAuthorized, (req, res) => {
    moduleController.getMaterials(req, res);
});



//export the router
module.exports = moduleRouter;