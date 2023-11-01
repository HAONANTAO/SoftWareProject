const db = require("../models");
const Coach = db.coaches;
const AgeGroups = db.ageGroups;

// create a new coach
const createCoach = async (
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
      // check whether coach loginID is already exist
      let coach = await Coach.findOne({ loginID: loginID });
      if (coach) {
        return { status: 1 };
      }
  
      // create a new coach
      const newCoach = new Coach({
        firstName,
        middleName,
        lastName,
        loginID,
        password,
        description,
        age,
        address,
        phone
      });
  
      const data = await newCoach.save(newCoach);
      return { status: 0, data: data };
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while creating the Coach."
      );
    }
  };
  
  // delete a coach
  const deleteCoach = async (
    _id
  ) => {
    try {
      // delete the coach id in the agegroups
      AgeGroups.updateMany(
        { coaches: _id },
        { $pull: { coaches: _id } },
        function(err, result) {
          if (err) throw err;
        }
      );
      const data = await Coach.deleteOne({ _id: _id });
      if (data.deletedCount === 1) {
        return { status: 0, data: data };
      } else {
        return { status: 1 };
      }
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while deleting the Coach."
      );
    };
  }
  
  // update a coach
  const updateCoach = async (
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
  
      // check whether coach exist
      let coach = await Coach.findOne({ _id: _id });
      if (!coach) {
        return { status: 1 };
      }
  
      // update the coach
      const data = await Coach.updateOne({ _id: _id }, {
        firstName,
        middleName,
        lastName,
        loginID,
        password,
        description,
        age,
        address,
        phone
      }
      );
      return { status: 0, data: data };
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while updating the Coach."
      );
    }
  };
  
  // get one coach
  const getOneCoach = async (
    _id
  ) => {
    try {
      const data = await Coach.findOne({ _id: _id });
        if (!data) {
          return { status: 1 };
        }
        else{
          return { status: 0, data: data };
        }
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while finding the Coach."
      );
    };
  }
  
  // get all coach
  const getAllCoach = async (
    _id
  ) => {
    try {
      const coachData = await Coach.find({});
      var data = [];
      for (var i = 0; i < coachData.length; i++) {
        var newData = Object();
        newData.coach = coachData[i];
        const ageGroupData = await AgeGroups.find({coaches:coachData[i]._id});
        newData.ageGroup = ageGroupData;
        data.push(newData);
      }
        return { status: 0, data: data };
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while finding the Coach."
      );
    };
  }
  
 // find coach by first/middle/last name
 const findCoach = async (
  kw
) => {
  try {
    const query = {
      $or: [
        { firstName: { $regex: kw, $options: 'i' } },
        { lastName: { $regex: kw, $options: 'i' } },
        { middleName: { $regex: kw, $options: 'i' } },
      ],
    };
    const coachData = await Coach.find(query);
    var data = [];
    for (var i = 0; i < coachData.length; i++) {
      var newData = Object();
      newData.coach = coachData[i];
      const ageGroupData = await AgeGroups.find({coaches:coachData[i]._id});
      newData.ageGroup = ageGroupData;
      data.push(newData);
    }
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Coach."
    );
  };
}

module.exports = {
  createCoach,
  deleteCoach,
  updateCoach,
  getOneCoach,
  getAllCoach,
  findCoach,
};