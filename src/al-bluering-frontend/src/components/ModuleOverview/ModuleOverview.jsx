import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateMaterialForm from "../CreateMaterialForm/CreateMaterialForm";
import { normalDateFormat } from "../../utils/DateFormat/DateFormat";
import { Button, Modal, message } from "antd";

import {
  reqCreateTextMaterial,
  reqCreateFileMaterial,
  reqCreateAssessment,
} from "../../api";

// redux
import { connect } from "react-redux";
import {
  createUpdatedAction,
  createRemoveAction,
} from "../../redux/actions/module";

import "./ModuleOvervierw.less";

function ModuleOverview(props) {
  const { curModule, isUpdated } = props;

  const [isModalVisible, setIsModalvisible] = useState(0);
  const [formInfo, setFormInfo] = useState({});
  const [formType, setFormType] = useState(0);
  const [okDisabled, setOkDisabled] = useState(false);

  // useNavigate
  const navigate = useNavigate();

  useEffect(() => {});
  // handle function
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    setIsModalvisible(1);
  };

  const handleConfirmCancel = () => {
    setIsModalvisible(0);
    setFormInfo({});
    setFormType(0);
    setOkDisabled(false);
  };

  const handleConfirmCreate = async () => {
    try {
      if (formType === 1) {
        await reqCreateTextMaterial(
          "texture",
          formInfo.name,
          formInfo.content,
          curModule._id,
          formInfo.order
        );
      } else if (formType === 2) {
        await reqCreateFileMaterial(
          "file",
          formInfo.name,
          formInfo.url,
          formInfo.description,
          curModule._id,
          formInfo.order
        );
      } else if (formType === 3) {
        await reqCreateAssessment(
          "assessment",
          formInfo.name,
          true,
          formInfo.questions,
          formInfo.description,
          curModule._id,
          formInfo.order
        );
      } else {
        message.error("unknown error");
      }
      isUpdated(1);
    } catch (err) {
      message.error(err);
    }
    setIsModalvisible(0);
    setFormInfo({});
    setFormType(0);
    setOkDisabled(false);
  };

  const handleParamsFromCraeteMaterial = (value, status, type) => {
    console.log("get params: ", value, status, type);
    setFormInfo(value);
    setFormType(type);
    setOkDisabled(status);
  };

  return (
    <div className="overview">
      <div className="text-area">
        <p className="title">{curModule.name}</p>
        <p className="update-at">
          <span>Update Time: </span>
          {normalDateFormat(new Date(curModule.updatedAt))}
        </p>
        <p className="material-num">
          <span>Total material number: </span>
          {curModule.mLength}
        </p>
      </div>

      <div className="operation-area">
        <Button type="primary" size="small" onClick={() => handleGoBack()}>
          Back
        </Button>
        <Button type="primary" size="small" onClick={() => handleCreate()}>
          Create
        </Button>
      </div>
      <Modal
        title="Create New Material"
        open={isModalVisible === 1}
        onOk={() => handleConfirmCreate()}
        onCancel={() => handleConfirmCancel()}
        okButtonProps={{ disabled: okDisabled }}
        destroyOnClose
      >
        <CreateMaterialForm
          size={curModule.mLength}
          update={handleParamsFromCraeteMaterial}
        ></CreateMaterialForm>
      </Modal>
    </div>
  );
}

export default connect((state) => ({ curModule: state.curModule }), {
  isUpdated: createUpdatedAction,
  removeModule: createRemoveAction,
})(ModuleOverview);
