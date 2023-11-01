const express = require("express");

const ageGroupRouter = express.Router();
const ageGroupController = require("../controllers/ageGroupController");
const { ensureAuthorized } = require("../utils/token");

// create a new ageGroup
ageGroupRouter.post("/", ensureAuthorized, (req, res) => {
    ageGroupController.postCreateAgeGroup(req, res);
  });
  
  // delete a ageGroup
  ageGroupRouter.delete("/:id", ensureAuthorized, (req, res) => {
      ageGroupController.deleteAgeGroup(req, res);
    });
  
  // update a ageGroup
  ageGroupRouter.put("/:id", ensureAuthorized, (req, res) => {
      ageGroupController.updateAgeGroup(req, res);
  });
  
  // get a ageGroup by id
  ageGroupRouter.get("/:id", ensureAuthorized, (req, res) => {
      ageGroupController.getOneAgeGroup(req, res);
  });
  
  // get all ageGroup
  ageGroupRouter.get("/", ensureAuthorized, (req, res) => {
      ageGroupController.getAllAgeGroup(req, res);
  });

  // find ageGroup
  ageGroupRouter.get("/find/:kw", ensureAuthorized, (req, res) => {
    ageGroupController.findAgeGroup(req, res);
  });

//export the router
module.exports = ageGroupRouter;
