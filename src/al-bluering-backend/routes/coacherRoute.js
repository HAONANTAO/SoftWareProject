const express = require("express");

const coacherRouter = express.Router();
const coacherController = require("../controllers/coacherController");
const { ensureAuthorized } = require("../utils/token");

// create a new coach
coacherRouter.post("/", ensureAuthorized, (req, res) => {
    coacherController.postCreateCoach(req, res);
  });

// delete a coach
coacherRouter.delete("/:id", ensureAuthorized, (req, res) => {
    coacherController.deleteCoach(req, res);
  });

// upadte a coach
coacherRouter.put("/:id", ensureAuthorized, (req, res) => {
    coacherController.updateCoach(req, res);
});

// get a coach by id
coacherRouter.get("/:id", ensureAuthorized, (req, res) => {
    coacherController.getOneCoach(req, res);
});

// get all coach
coacherRouter.get("/", ensureAuthorized, (req, res) => {
    coacherController.getAllCoach(req, res);
});

// find coach
coacherRouter.get("/find/:kw", ensureAuthorized, (req, res) => {
  coacherController.findCoach(req, res);
});

//export the router
module.exports = coacherRouter;
