const ageGroupService = require("../services/ageGroupService");

// create a new AgeGroup
const postCreateAgeGroup = async (req, res) => {
    try {
      const { 
        name,
        coaches,
        modules,
      } = req.body;
      const result = await ageGroupService.createAgeGroup(
        name,
        coaches,
        modules,
      );
      if (result.status === 0) {
        res.status(200).json(result.data);
      } else if (result.status === 1) {
        res.status(500).json({ msg: "AgeGroup already exist." });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };
  
  
  // delete a AgeGroup
  const deleteAgeGroup = async (req, res) => {
    try {
        _id = req.params.id;
        const result = await ageGroupService.deleteAgeGroup(
          _id
        );
      if (result.status === 0) {
        res.status(204).json(result.data);
      } else if (result.status === 1) {
        res.status(404).json({ msg: "AgeGroup_id do not exist" });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };
  
  // upadte a AgeGroup
  const updateAgeGroup = async (req, res) => {
    try {
        const {
            name,
            coaches,
            modules,
        } = req.body;
        const _id = req.params.id;
        const result = await ageGroupService.updateAgeGroup(
            _id,
            name,
            coaches,
            modules,
        );
        if (result.status === 0) {
            res.status(200).json(result.data);
        } else if (result.status === 1) {
            res.status(404).json({ msg: "AgeGroup_id do not exist" });
        }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };
  
  // get one AgeGroup
  const getOneAgeGroup = async (req, res) => {
      try {
          const _id = req.params.id;
          const result = await ageGroupService.getOneAgeGroup(
              _id,
          );
          if (result.status === 0) {
              res.status(200).json(result.data);
          } else if (result.status === 1) {
              res.status(404).json({ msg: "AgeGroup_id do not exist" });
          }
      } catch (err) {
        res.status(500).json({
          message: err.message || "An unexpected error occurred.",
        });
      }
    };
  
  // get all AgeGroup
  const getAllAgeGroup = async (req, res) => {
      try {
          const _id = req.params.id;
          const result = await ageGroupService.getAllAgeGroup(
              _id,
          );
          if (result.status === 0) {
              res.status(200).json(result.data);
          }
      } catch (err) {
        res.status(500).json({
          message: err.message || "An unexpected error occurred.",
        });
      }
    };

    // find AgeGroup
    const findAgeGroup = async (req, res) => {
      try {
          const kw = req.params.kw;
          const result = await ageGroupService.findAgeGroup(
              kw,
          );
          if (result.status === 0) {
              res.status(200).json(result.data);
          }
      } catch (err) {
        res.status(500).json({
          message: err.message || "An unexpected error occurred.",
        });
      }
    };

  module.exports = {
    postCreateAgeGroup,
    deleteAgeGroup,
    updateAgeGroup,
    getOneAgeGroup,
    getAllAgeGroup,
    findAgeGroup,
  };