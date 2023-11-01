const materialService = require("../services/materialService");

// create a new material
const postCreateMaterial = async (req, res) => {
  try {
    const {
      type,
      name,
      description,
      url,
      content,
      questions,
      isAnswerVisible,
      module_id,
      id,
    } = req.body;
    let result = null;
    switch (type) {
      case "file":
        result = await materialService.createFileMaterial(
          url,
          description,
          name,
          module_id,
          id,
        );
        break;
      case "texture":
        result = await materialService.createTextureMaterial(
          content,
          name,
          module_id,
          id,
        );
        break;
      case "assessment":
        result = await materialService.createAssessment(
          description,
          isAnswerVisible,
          questions,
          name,
          module_id,
          id,
        );
        break;
      default:
        result = { status: 1 };
        break;
    }

    if (result.status === 0) {
      res.status(200).json(result.data);
    } else if (result.status === 1) {
      res.status(400).json({ msg: "Material type error" });
    } else if (result.status === 2) {
      res.status(400).json({ msg: "Incorrect module_id/id" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// delete a Material
const deleteMaterial = async (req, res) => {
  try {
      _id = req.params.id;
      const result = await materialService.deleteMaterial(
        _id
      );
    if (result.status === 0) {
      res.status(204).json(result.data);
    } else if (result.status === 1) {
      res.status(404).json({ msg: "Material_id do not exist" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// upadte a Material
const updateMaterial = async (req, res) => {
  try {
    const {
      type,
      name,
      description,
      url,
      content,
      questions,
      isAnswerVisible,
    } = req.body;
    const _id = req.params.id;
    result = await materialService.updateMaterial(
      _id,
      type,
      name,
      description,
      url,
      content,
      questions,
      isAnswerVisible,
    );
    if (result.status === 0) {
        res.status(200).json(result.data);
    } else if (result.status === 1) {
        res.status(404).json({ msg: "Material_id do not exist" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// get one Material
const getOneMaterial = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await materialService.getOneMaterial(
            _id,
        );
        if (result.status === 0) {
            res.status(200).json(result.data);
        } else if (result.status === 1) {
            res.status(404).json({ msg: "Material_id do not exist" });
        }
    } catch (err) {
      res.status(500).json({
        message: err.message || "An unexpected error occurred.",
      });
    }
  };

// get all Material
const getAllMaterial = async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await materialService.getAllMaterial(
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
  postCreateMaterial,
  deleteMaterial,
  updateMaterial,
  getOneMaterial,
  getAllMaterial,
};
