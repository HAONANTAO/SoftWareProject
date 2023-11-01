const moduleService = require("../services/moduleService");

// create a new Module
const postCreateModule = async (req, res) => {
  try {
    const { 
      name,
      father_id,
      level,
    } = req.body;
    const result = await moduleService.createModule(
      name,
      father_id,
      level,
    );
    if (result.status === 0) {
      res.status(200).json(result.data);
    } else if (result.status === 1) {
      res.status(500).json({ msg: "Module already exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};


// delete a Module
const deleteModule = async (req, res) => {
  try {
      _id = req.params.id;
      const result = await moduleService.deleteModule(
        _id
      );
    if (result.status === 0) {
      res.status(204).json(result.data);
    } else if (result.status === 1) {
      res.status(404).json({ msg: "Module_id do not exist" });
    } else if (result.status === 2) {
      res.status(400).json({ msg: "cannot delete a module with sub modules" });
    } else if (result.status === 3) {
      res.status(400).json({ msg: "Fail to delete related materials" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// update a Module
const updateModule = async (req, res) => {
  try {
      const { 
        name,
        father_id,
        level,
        materials
      } = req.body;
      const _id = req.params.id;
      const result = await moduleService.updateModule(
          _id,
          name,
          father_id,
          level,
          materials
      );
      if (result.status === 0) {
          res.status(200).json(result.data);
      } else if (result.status === 1) {
          res.status(404).json({ msg: "Module_id do not exist" });
      }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// get one Module
const getOneModule = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await moduleService.getOneModule(
            _id,
        );
        if (result.status === 0) {
            res.status(200).json(result.data);
        } else if (result.status === 1) {
            res.status(404).json({ msg: "Module_id do not exist" });
        }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };

// get all Module
const getAllModule = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await moduleService.getAllModule(
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

  // get all sub Module
  const getSubModule = async (req, res) => {
      try {
          const _id = req.params.id;
          const result = await moduleService.getSubModule(
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

    // get all materials
    const getMaterials = async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await moduleService.getMaterials(
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

module.exports = {
  postCreateModule,
  deleteModule,
  updateModule,
  getOneModule,
  getAllModule,
  getSubModule,
  getMaterials,
};
