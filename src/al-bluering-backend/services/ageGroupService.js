const db = require("../models");
const AgeGroup = db.ageGroups;
const Modules = db.modules;


// create a new AgeGroup
const createAgeGroup = async (
    name,
    coaches,
    modules,
  ) => {
    try {
      // check whether AgeGroup name is already exist
      let ageGroup = await AgeGroup.findOne({ name: name });
      if (ageGroup) {
        return { status: 1 };
      }
      var moduleIDs = (modules) ? (typeof modules === 'object' ? modules : JSON.parse(modules)) : null;
      var moduleData = await Modules.find({ _id: { $in: moduleIDs } });
      var sortedModules = moduleIDs.sort((a, b) => {
        const valueA = moduleData.find((item) => item._id.equals(a));
        const valueB = moduleData.find((item) => item._id.equals(b));
        return valueA.level - valueB.level;
      });
      // create a new AgeGroup
      const newAgeGroup = new AgeGroup({
        name: name,
        coaches: (coaches) ? (typeof coaches === 'object' ? coaches : JSON.parse(coaches)) : null,
        modules: sortedModules,
      });
  
      const data = await newAgeGroup.save(newAgeGroup);
      return { status: 0, data: data };
    } catch (err) {
      throw new Error(
        err.message || "Some error occurred while creating the AgeGroup."
      );
    }
  };
  
    // delete an AgeGroup
    const deleteAgeGroup = async (
      _id
    ) => {
      try {
        const data = await AgeGroup.deleteOne({ _id: _id });
        if (data.deletedCount === 1) {
          return { status: 0, data: data };
        } else {
          return { status: 1 };
        }
      } catch (err) {
        throw new Error(
          err.message || "Some error occurred while deleting the AgeGroup."
        );
      };
    }
    
    // upadte an AgeGroup
    const updateAgeGroup = async (
        _id,
        name,
        coaches,
        modules,
    ) => {
      try {
    
        // check whether AgeGroup exist
        let ageGroup = await AgeGroup.findOne({ _id: _id });
        if (!ageGroup) {
          return { status: 1 };
        }

        var moduleIDs = (modules) ? (typeof modules === 'object' ? modules : JSON.parse(modules)) : null;
        var moduleData = await Modules.find({ _id: { $in: moduleIDs } });
        var sortedModules = moduleIDs.sort((a, b) => {
          const valueA = moduleData.find((item) => item._id.equals(a));
          const valueB = moduleData.find((item) => item._id.equals(b));
          return valueA.level - valueB.level;
        });
    
        // update the AgeGroup
        const data = await AgeGroup.updateOne({ _id: _id }, {
            name: name,
            coaches: (coaches) ? (typeof coaches === 'object' ? coaches : JSON.parse(coaches)) : null,
            modules: sortedModules,
        }
        );
        return { status: 0, data: data };
      } catch (err) {
        throw new Error(
          err.message || "Some error occurred while updating the AgeGroup."
        );
      }
    };
    
    // get one AgeGroup
    const getOneAgeGroup = async (
      _id
    ) => {
      try {
        const data = await AgeGroup.findOne({ _id: _id });
          if (!data) {
            return { status: 1 };
          }
          else{
            return { status: 0, data: data };
          }
      } catch (err) {
        throw new Error(
          err.message || "Some error occurred while finding the AgeGroup."
        );
      };
    }
    
    // get all AgeGroup
    const getAllAgeGroup = async (
      _id
    ) => {
      try {
        const data = await AgeGroup.find({});
          return { status: 0, data: data };
      } catch (err) {
        throw new Error(
          err.message || "Some error occurred while finding the AgeGroup."
        );
      };
    }
    
    // find AgeGroup
    const findAgeGroup = async (
      kw
    ) => {
      try {
        const ageGroupData = await AgeGroup.find({ name: { $regex: kw, $options: 'i' } }).populate('coaches').populate('modules');
          return { status: 0, data: ageGroupData };
      } catch (err) {
        throw new Error(
          err.message || "Some error occurred while finding the AgeGroup."
        );
      };
    }

  module.exports = {
    createAgeGroup,
    deleteAgeGroup,
    updateAgeGroup,
    getOneAgeGroup,
    getAllAgeGroup,
    findAgeGroup,
  };