const db = require("../models");
const Module = db.modules;
const FileMaterials = db.fileMaterials;
const TextureMaterials = db.textureMaterials;
const Assessments = db.assessments;
const Materials = db.materials;

// create a new module
const createModule = async (name, father_id, level) => {
  try {
    // check whether module name is already exist
    let module = await Module.findOne({ name: name });
    if (module) {
      return { status: 1 };
    }
    // create a new module
    const newModule = new Module({
      name: name,
      father_id: father_id,
      level: level,
      materials: [],
    });

    const data = await newModule.save(newModule);
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while creating the Module."
    );
  }
};

// delete a Module
const deleteModule = async (_id) => {
  try {
    const subModules = await Module.count({ father_id: _id });
    if (subModules > 0) {
      return { status: 2 };
    }

    const moduleToDelete = await Module.findOne({ _id: _id });

    // delete all related materials
    var material_id;
    var materialFindResult;
    var materialDeleteResult;
    for (var i = 0; i < moduleToDelete.materials.length; i++) {
      material_id = moduleToDelete.materials[i].material;
      materialFindResult = await Materials.findOne({ _id: material_id });
      if (!materialFindResult) {
        return { status: 3 };
      }
      switch (materialFindResult.type) {
        case "file":
          result = await FileMaterials.deleteOne({ _id: materialFindResult.fileMaterials });
          break;
        case "texture":
          result = await TextureMaterials.deleteOne({ _id: materialFindResult.textureMaterials });
          break;
        case "assessment":
          result = await Assessments.deleteOne({ _id: materialFindResult.assessment });
          break;
        default:
          return { status: 3 };
      }
      if (! result.deletedCount === 1) {
        return { status: 3 };
      }
      materialDeleteResult = await Materials.deleteOne({ _id: material_id });
      if (! materialDeleteResult.deletedCount === 1) {
        return { status: 3 };
      }
    }

    const data = await Module.deleteOne({ _id: _id });
    if (data.deletedCount === 1) {
      return { status: 0, data: data };
    } else {
      return { status: 1 };
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while deleting the Module."
    );
  }
};

// upadte a Module
const updateModule = async (_id, name, father_id, level, materials) => {
  try {
    // check whether Module exist
    let module = await Module.findOne({ _id: _id });
    if (!module) {
      return { status: 1 };
    }

    // update the Module
    const data = await Module.updateOne(
      { _id: _id },
      {
        name,
        father_id,
        level,
        materials,
      }
    );
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while updating the Module."
    );
  }
};

// get one Module
const getOneModule = async (_id) => {
  try {
    const data = await Module.findOne({ _id: _id });
    if (!data) {
      return { status: 1 };
    } else {
      return { status: 0, data: data };
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Module."
    );
  }
};

// get all Module
const getAllModule = async (_id) => {
  try {
    const data = await Module.find({});
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Module."
    );
  }
};

// get all sub Module
const getSubModule = async (_id) => {
  try {
    const data = await Module.find({ father_id: _id });
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the sub Module."
    );
  }
};

// get Module Materials
const getMaterials = async (_id) => {
  try {
    const module = await Module.findOne({ _id: _id });

    var results = [];
    for (var i = 0; i < module.materials.length; i++) {
      var result;
      switch (module.materials[i].materialType) {
        case "file":
          result = await Materials.findOne({
            _id: module.materials[i].material,
          });
          result = await FileMaterials.findOne({ _id: result.fileMaterials });
          results.push({
            type: "file",
            id: module.materials[i].id,
            material_id: module.materials[i].material,
            material: result,
          });
          break;
        case "texture":
          result = await Materials.findOne({
            _id: module.materials[i].material,
          });
          result = await TextureMaterials.findOne({
            _id: result.textureMaterials,
          });
          results.push({
            type: "texture",
            id: module.materials[i].id,
            material_id: module.materials[i].material,
            material: result,
          });
          break;
        case "assessment":
          result = await Materials.findOne({
            _id: module.materials[i].material,
          });
          result = await Assessments.findOne({ _id: result.assessment });
          results.push({
            type: "assessment",
            id: module.materials[i].id,
            material_id: module.materials[i].material,
            material: result,
          });
          break;
      }
      console.log(module.materials[i]);
      console.log(result);
    }
    console.log(results);
    return { status: 0, data: results };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the sub Module."
    );
  }
};

module.exports = {
  createModule,
  deleteModule,
  updateModule,
  getOneModule,
  getAllModule,
  getSubModule,
  getMaterials,
};
