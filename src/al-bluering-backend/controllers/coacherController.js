const coacherService = require("../services/coacherService");

// create a new coach
const postCreateCoach = async (req, res) => {
    try {
        const { 
            firstName,
            middleName,
            lastName,
            loginID,
            password,
            description,
            age,
            address,
            phone
        } = req.body;
        const result = await coacherService.createCoach(
            firstName,
            middleName,
            lastName,
            loginID,
            password,
            description,
            age,
            address,
            phone
        );
      if (result.status === 0) {
        res.status(201).json(result.data);
      } else if (result.status === 1) {
        res.status(400).json({ msg: "Coach loginID already exist." });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };

  // delete a coach
  const deleteCoach = async (req, res) => {
      try {
          _id = req.params.id;
          const result = await coacherService.deleteCoach(
            _id
          );
        if (result.status === 0) {
          res.status(204).json(result.data);
        } else if (result.status === 1) {
          res.status(404).json({ msg: "Coach_id do not exist" });
        } else if (result.status === 2) {
          res.status(404).json({ msg: "Fail to delete the coach" });
        }
      } catch (err) {
        res.status(500).json({
          message: err.message || "An unexpected error occurred.",
        });
      }
    };

  // upadte a coach
  const updateCoach = async (req, res) => {
      try {
          const { 
              firstName,
              middleName,
              lastName,
              loginID,
              password,
              description,
              age,
              address,
              phone
          } = req.body;
          const _id = req.params.id;
          const result = await coacherService.updateCoach(
              _id,
              firstName,
              middleName,
              lastName,
              loginID,
              password,
              description,
              age,
              address,
              phone
          );
          if (result.status === 0) {
              res.status(200).json(result.data);
          } else if (result.status === 1) {
              res.status(404).json({ msg: "Coach_id do not exist" });
          }
      } catch (err) {
        res.status(500).json({
          message: err.message || "An unexpected error occurred.",
        });
      }
    };

    // get one coach
    const getOneCoach = async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await coacherService.getOneCoach(
                _id,
            );
            if (result.status === 0) {
                res.status(200).json(result.data);
            } else if (result.status === 1) {
                res.status(404).json({ msg: "Coach_id do not exist" });
            }
        } catch (err) {
          res.status(500).json({
            message: err.message || "An unexpected error occurred.",
          });
        }
      };

    // get all coach
    const getAllCoach = async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await coacherService.getAllCoach(
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
   // find coach
   const findCoach = async (req, res) => {
    try {
        const kw = req.params.kw || "";
        const result = await coacherService.findCoach(
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
  postCreateCoach,
  deleteCoach,
  updateCoach,
  getOneCoach,
  getAllCoach,
  findCoach,
};
      
