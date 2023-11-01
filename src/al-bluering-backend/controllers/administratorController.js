const administratorService = require("../services/administratorService");

// create a new admin
const postCreateAdmin = async (req, res) => {
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
      phone,
    } = req.body;
    const result = await administratorService.createAdmin(
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
      res.status(500).json({ msg: "Admin loginID already exist." });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// delete an admin
const deleteAdmin = async (req, res) => {
  try {
    _id = req.params.id;
    const result = await administratorService.deleteAdmin(_id);
    if (result.status === 0) {
      res.status(204).json(result.data);
    } else if (result.status === 1) {
      res.status(404).json({ msg: "Admin_id do not exist" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// upadte an admin
const updateAdmin = async (req, res) => {
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
      phone,
    } = req.body;
    const _id = req.params.id;
    const result = await administratorService.updateAdmin(
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
      res.status(404).json({ msg: "Admin_id do not exist" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// get one admin
const getOneAdmin = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await administratorService.getOneAdmin(_id);
    if (result.status === 0) {
      res.status(200).json(result.data);
    } else if (result.status === 1) {
      res.status(404).json({ msg: "Admin_id do not exist" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// get all admin
const getAllAdmin = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await administratorService.getAllAdmin(_id);
    if (result.status === 0) {
      res.status(200).json(result.data);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

// admin login
const login = async (req, res) => {
  // login time limit part, not implement yet

  // main part
  try {
    const { loginID, password } = req.body;

    const result = await administratorService.login(loginID, password);
    if (result.status === 0) {
      res.cookie("AttemptTimes", 0, {
        maxAge: 1000,
        overwrite: true,
      });
      res.status(200).json({
        token: result.token,
      });
    } else if (result.status === 1) {
      res.status(403).json({
        msg: "Incorrect loginId/password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "An unexpected error occurred.",
    });
  }
};

module.exports = {
  postCreateAdmin,
  deleteAdmin,
  updateAdmin,
  getOneAdmin,
  getAllAdmin,
  login,
};
