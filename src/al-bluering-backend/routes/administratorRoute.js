const express = require("express");


const { ensureAuthorized } = require("../utils/token");


const administratorRouter = express.Router();
const administratorController = require("../controllers/administratorController");

// create a new admin
administratorRouter.post("/", (req, res) => {

  administratorController.postCreateAdmin(req, res);
});

// delete an admin
administratorRouter.delete("/:id", ensureAuthorized, (req, res) => {
  administratorController.deleteAdmin(req, res);
});

// upadte an admin
administratorRouter.put("/:id", ensureAuthorized, (req, res) => {
  administratorController.updateAdmin(req, res);
});

// get an admin by id
administratorRouter.get("/:id", ensureAuthorized, (req, res) => {
  administratorController.getOneAdmin(req, res);
});

// get all admin
administratorRouter.get("/", ensureAuthorized, ensureAuthorized, (req, res) => {
  administratorController.getAllAdmin(req, res);
});

// admin login
administratorRouter.post("/login", (req, res) => {
  administratorController.login(req, res)
});

//export the router
module.exports = administratorRouter;
