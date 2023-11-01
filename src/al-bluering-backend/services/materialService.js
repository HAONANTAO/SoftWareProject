const db = require("../models");
const Material = db.materials;
const FileMaterials = db.fileMaterials;
const TextureMaterials = db.textureMaterials;
const Assessments = db.assessments;
const Modules = db.modules;

const createFileMaterial = async (
  url,
  description,
  name,
  module_id,
  id,
) => {
  try {
    if ( !module_id || !id) {
      return { status: 2 };
    }

    // update the module
    let module = await Modules.findOne({ _id: module_id });
    if (!module) {
      return { status: 2 };
    } 

    // create a new file
    const newFile = new FileMaterials({
      name: name,
      url: url,
      description: description,
    });

    const data1 = await newFile.save(newFile);

    const newMaterial = new Material({
      type: "file",
      fileMaterials: data1._id,
    });

    const data2 = await newMaterial.save(newMaterial);
    var newMaterialsList = module.materials;
    var newModuleMaterial = new Object();
    newModuleMaterial.materialType = "file";
    newModuleMaterial.id = id;
    newModuleMaterial.material = data2._id;

    // update the ids
    // increment by 1 if id is greater or equal to new material id
    if (newMaterialsList) {
      for (var i = 0; i < newMaterialsList.length; i++) {
        if (newMaterialsList[i].id >= id) {
          newMaterialsList[i].id += 1;
        }
      }
      // add the new material to the list
      newMaterialsList.splice(id-1, 0, newModuleMaterial);
    }
    else {
      newMaterialsList = [newModuleMaterial]
    }

    // save to the database
    const data3 = await Modules.updateOne(
      { _id: module_id },
      {
        materials: newMaterialsList
      }
    );

    var data = new Object();
    data.fileMaterial = data1;
    data.material = data2;
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while creating the File."
    );
  }
};

const createTextureMaterial = async (
  content,
  name,
  module_id,
  id,
) => {
  try {
    if ( !module_id || !id) {
      return { status: 2 };
    }

    // update the module
    let module = await Modules.findOne({ _id: module_id });
    if (!module) {
      return { status: 2 };
    } 

    // create a new text
    const newText = new TextureMaterials({
      content: content,
      name: name,
    });

    const data1 = await newText.save(newText);

    const newMaterial = new Material({
      type: "texture",
      textureMaterials: data1._id,
    });

    const data2 = await newMaterial.save(newMaterial);
    var newMaterialsList = module.materials;
    var newModuleMaterial = new Object();
    newModuleMaterial.materialType = "texture";
    newModuleMaterial.id = id;
    newModuleMaterial.material = data2._id;

    // update the ids
    // increment by 1 if id is greater or equal to new material id
    if (newMaterialsList) {
      for (var i = 0; i < newMaterialsList.length; i++) {
        if (newMaterialsList[i].id >= id) {
          newMaterialsList[i].id += 1;
        }
      }
      // add the new material to the list
      newMaterialsList.splice(id-1, 0, newModuleMaterial);
    }
    else {
      newMaterialsList = [newModuleMaterial]
    }

    // save to the database
    const data3 = await Modules.updateOne(
      { _id: module_id },
      {
        materials: newMaterialsList
      }
    );

    var data = new Object();
    data.textureMaterial = data1;
    data.material = data2;
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while creating the Text."
    );
  }
};

const createAssessment = async (
  description,
  isAnswerVisible,
  questions,
  name,
  module_id,
  id,
) => {
  try {
    if ( !module_id || !id) {
      return { status: 2 };
    }

    // update the module
    let module = await Modules.findOne({ _id: module_id });
    if (!module) {
      return { status: 2 };
    } 

    // create a new Assessment
    const newAssessment = new Assessments({
      description: description,
      isAnswerVisible: (isAnswerVisible === 'true'),
      questions: (questions) ? (typeof questions === 'object' ? questions : JSON.parse(questions)) : null,
      name: name,
    });

    const data1 = await newAssessment.save(newAssessment);

    const newMaterial = new Material({
      type: "assessment",
      assessment: data1._id,
    });

    const data2 = await newMaterial.save(newMaterial);
    var newMaterialsList = module.materials;
    var newModuleMaterial = new Object();
    newModuleMaterial.materialType = "assessment";
    newModuleMaterial.id = id;
    newModuleMaterial.material = data2._id;

    // update the ids
    // increment by 1 if id is greater or equal to new material id
    if (newMaterialsList) {
      for (var i = 0; i < newMaterialsList.length; i++) {
        if (newMaterialsList[i].id >= id) {
          newMaterialsList[i].id += 1;
        }
      }
      // add the new material to the list
      newMaterialsList.splice(id-1, 0, newModuleMaterial);
    }
    else {
      newMaterialsList = [newModuleMaterial]
    }

    // save to the database
    const data3 = await Modules.updateOne(
      { _id: module_id },
      {
        materials: newMaterialsList
      }
    );

    var data = new Object();
    data.assessment = data1;
    data.material = data2;
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while creating the Assessment."
    );
  }
};

// delete a Material
const deleteMaterial = async (
  _id
) => {
  try {
    const data1 = await Material.findOne({ _id: _id });
    if (!data1) {
      return { status: 1 };
    }

    moduleToUpdate = await Modules.findOne({
      materials: {$elemMatch: {material:data1._id}}
    })
    var newMaterialsList = moduleToUpdate.materials;
    // find the index of the material
    var index = newMaterialsList.findIndex(function(item) { return item.material.equals(data1._id) });
    if (index == -1){
      return { status: 1 };
    }
    //  delete the material
    newMaterialsList.splice(index, 1);
    // sort the list by id
    newMaterialsList.sort( function(a, b) {
      if ( a.id < b.id ){
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    } );
    // reorder the list
    for (var i = 0; i < newMaterialsList.length; i++) {
      var newMaterial = newMaterialsList[i];
      newMaterial.id = i + 1;
      newMaterialsList[i] = newMaterial;
    }

    await Modules.updateOne({_id:moduleToUpdate._id}, 
      {$set: {
        materials: newMaterialsList,
      }});
    switch (data1.type) {
      case "file":
        result = await FileMaterials.deleteOne({ _id: data1.fileMaterials });
        break;
      case "texture":
        result = await TextureMaterials.deleteOne({ _id: data1.textureMaterials });
        break;
      case "assessment":
        result = await Assessments.deleteOne({ _id: data1.assessment });
        break;
      default:
        return { status: 1 };
    }

    const data = await Material.deleteOne({ _id: _id });
    if (data.deletedCount === 1) {
      return { status: 0, data: data };
    } else {
      return { status: 1 };
    }
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while deleting the Material."
    );
  };
}
  
// upadte a Material
const updateMaterial = async (
  _id,
  type,
  name,
  description,
  url,
  content,
  questions,
  isAnswerVisible,
) => {
  try {

    // check whether Material exist
    let material = await Material.findOne({ _id: _id });
    if (!material) {
      return { status: 1 };
    }

    // update the Material
    switch (material.type) {
      case "file":
        data = await FileMaterials.updateOne({_id:material.fileMaterials}, 
          {$set: {
            name: name,
            url: url,
            description: description,
          }});
        break;
      case "texture":
        data = await TextureMaterials.updateOne({_id:material.textureMaterials}, 
          {$set: {
            content: content,
            name: name,
          }});
        break;
      case "assessment":
        data = await Assessments.updateOne({_id:material.assessment}, 
          {$set: {
            description: description,
            isAnswerVisible: (isAnswerVisible === 'true'),
            questions: (questions) ? (typeof questions === 'object' ? questions : JSON.parse(questions)) : null,
            name: name,
          }});
        break;
      default:
        return { status: 1 };
    }
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while updating the Material."
    );
  }
};
  
// get one Material
const getOneMaterial = async (
  _id
) => {
  try {
    const data1 = await Material.findOne({ _id: _id });
    if (!data1) {
      return { status: 1 };
    }
    var data2;
    var data = new Object();
    data.material = data1;
    switch (data1.type) {
      case "file":
        data2 = await FileMaterials.findOne({ _id: data1.fileMaterials });
        data.fileMaterial = data2;
        break;
      case "texture":
        data2 = await TextureMaterials.findOne({ _id: data1.textureMaterials });
        data.textureMaterial = data2;
        break;
      case "assessment":
        data2 = await Assessments.findOne({ _id: data1.assessment });
        data.assessment = data2;
        break;
      default:
        return { status: 1 };
    }
    return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Material."
    );
  };
}
  
// get all Material
const getAllMaterial = async (
  _id
) => {
  try {
    const data = await Material.find({});
      return { status: 0, data: data };
  } catch (err) {
    throw new Error(
      err.message || "Some error occurred while finding the Material."
    );
  };
}

module.exports = {
  createFileMaterial,
  createTextureMaterial,
  createAssessment,
  deleteMaterial,
  updateMaterial,
  getOneMaterial,
  getAllMaterial,
};
