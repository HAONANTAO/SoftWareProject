import React, { useCallback, useEffect, useState } from "react";

import { reqMaterialList } from "../../api";
import TextMaterialDisplay from "../TextMaterialDisplay/TextMaterialDisplay";
import FileMaterialDisplay from "../FileMaterialDisplay/FileMaterialDisplay";
import AssessmentDisplay from "../AssessmentDisplay/AssessmentDisplay";

import { List } from "antd";

import "./ModuleDetails.less";

// redux
import { connect } from "react-redux";
import { createUpdatedAction } from "../../redux/actions/module";

function ModuleDetails(props) {
  const { curModule, isUpdated } = props;
  const [materialsList, setMaterialsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateAllMaterials = (material) => {
    if (material.type === "texture") {
      return generateTextMaterial(material.material_id, material.material);
    } else if (material.type === "file") {
      return generateFileMaterial(material.material_id, material.material);
    } else if (material.type === "assessment") {
      return generateAssessmentMaterial(
        material.material_id,
        material.material
      );
    }
  };

  const generateTextMaterial = (id, material) => {
    console.log("render:", id, material.name, material.content);
    return (
      <List.Item key={id}>
        <TextMaterialDisplay
          id={id}
          name={material.name}
          content={material.content}
          callback={getMaterialsListCallback}
          deleteCallback={deleteCallback}
        ></TextMaterialDisplay>
      </List.Item>
    );
  };

  const generateFileMaterial = (id, material) => {
    console.log(
      "render:",
      id,
      material.name,
      material.url,
      material.description
    );
    return (
      <List.Item key={id}>
        <FileMaterialDisplay
          id={id}
          name={material.name}
          description={material.description}
          url={material.url}
          callback={getMaterialsListCallback}
          deleteCallback={deleteCallback}
        ></FileMaterialDisplay>
      </List.Item>
    );
  };

  const generateAssessmentMaterial = (id, material) => {
    console.log(
      "render:",
      id,
      material.name,
      material.questions,
      material.description
    );
    return (
      <List.Item key={id}>
        <AssessmentDisplay
          id={id}
          name={material.name}
          description={material.description}
          questions={material.questions}
          callback={getMaterialsListCallback}
          deleteCallback={deleteCallback}
        ></AssessmentDisplay>
      </List.Item>
    );
  };

  const deleteCallback = () => {
    isUpdated(-1);
  };
  const getMaterialsListCallback = useCallback(() => {
    (async function () {
      setLoading(true);
      let result = await reqMaterialList(curModule._id);
      setLoading(false);
      setMaterialsList(result);
      console.log("result: ", result);
    })();
  }, []);

  useEffect(() => {
    getMaterialsListCallback();
  }, [curModule.mLength]);

  return (
    <List
      split={false}
      loading={loading}
      className="details"
      dataSource={materialsList}
      renderItem={generateAllMaterials}
    />
  );
}

export default connect((state) => ({ curModule: state.curModule }), {
  isUpdated: createUpdatedAction,
})(ModuleDetails);
