const db = require("../models");
const AdministratorsModel = require("../models/Administrators.model");
const Admin = db.admins;

const { PRIVATE_KEY, EXPIRESD } = require("../utils/token");
const jwt = require("jsonwebtoken");
// create a new admin
const createAdmin = async (
  firstName,
  middleName,
  lastName,
  loginID,
  password,
  description,
  age,
  address,
  phone
) => {
  try {
    // check whether admin loginID is already exist
    let admin = await Admin.findOne({ loginID: loginID });
    if (admin) {
      return { status: 1 };
    }

    // create a new admin
    const newAdmin = new Admin({
      firstName,
      middleName,
      lastName,
      loginID,
      password,
      description,
      age,
      address,

      phone,
    });

    const data = await newAdmin.save(newAdmin);
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while creating the Admin."
    );
  }
};

// delete an admin
const deleteAdmin = async (_id) => {
  try {
    const data = await Admin.deleteOne({ _id: _id });
    if (data.deletedCount === 1) {
      return { status: 0, data: data };
    } else {
      return { status: 1 };
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while deleting the Admin."
    );
  }
};

// update an admin
const updateAdmin = async (
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
) => {
  try {
    // check whether admin exist
    let admin = await Admin.findOne({ _id: _id });
    if (!admin) {
      return { status: 1 };
    }

    // update the admin
    const data = await Admin.updateOne(
      { _id: _id },
      {
        firstName,
        middleName,
        lastName,
        loginID,
        password,
        description,
        age,
        address,
        phone,
      }
    );
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while updating the Admin."
    );
  }
};

// get one admin
const getOneAdmin = async (_id) => {
  try {
    const data = await Admin.findOne({ _id: _id });
    if (!data) {
      return { status: 1 };
    } else {
      return { status: 0, data: data };
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Admin."
    );
  }
};

// get all admin
const getAllAdmin = async (_id) => {
  try {
    const data = await Admin.find({});
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Admin."
    );
  }
};

// admin login
const login = async (loginID, password) => {
  try {
    var data = await Admin.findOne({ loginID }).select('password');
    if (!data) {
      return { status: 1 };
    }
    data = await data.authenticate(password);
    if (data === false) {
      return { status: 1 };
    } else {
      console.log(2);
      let authResult = await data.authenticate(password);
      console.log(authResult);
      if (authResult) {
        let uid = data._id;
        var token = jwt.sign({ uid }, PRIVATE_KEY, { expiresIn: EXPIRESD });
        return {
          status: 0,
          token: token,
        };
      } else {
        return { status: 1 };
      }
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Admin."
    );
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  updateAdmin,
  getOneAdmin,
  getAllAdmin,
  login,
};
