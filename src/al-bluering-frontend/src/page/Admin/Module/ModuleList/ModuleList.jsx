import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Modal, Table, Space, message } from "antd";

import CreateBtn from "../../../../components/CreateBtn/CreateBtn";
import LinkButton from "../../../../components/LinkButton/LinkButton";
import AddNewModuleForm from "../../../../components/AddNewModuleForm/AddNewModuleForm";
import UpdateModuleForm from "../../../../components/UpdateModuleForm/UpdateModuleForm";

import {
  reqModules,
  reqCreateModule,
  reqDeleteModule,
  reqUpdateModule,
} from "../../../../api";

// redux
import { connect } from "react-redux";
import { createEditAction } from "../../../../redux/actions/module";

function ModuleList(props) {
  // states
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [fatherId, setFatherId] = useState("000000000000000000000000");
  const [title, setTitle] = useState(["Module"]);
  const [pathId, setPathId] = useState(["000000000000000000000000"]);
  const [isModalVisible, setIsModalVisible] = useState(0);

  const [moduleName, setModuleName] = useState("");
  const [okDisabled, setOkDisabled] = useState(false);

  const { edit, curModule, editId, editStatus } = props;

  // useNavigate
  const navigate = useNavigate();

  // event handle functions
  const handleCreateModule = () => {
    setIsModalVisible(1);
    // editId(parentId);
  };
  const extra = (
    <CreateBtn
      title="Create Module"
      handleClick={() => handleCreateModule()}
    ></CreateBtn>
  );

  const handleClickExpand = (thisModule) => {
    edit(thisModule);
    setFatherId(thisModule._id);
    setTitle([...title, thisModule.name]);
    setPathId([...pathId, thisModule._id]);
  };

  const handleClickView = (thisModule) => {
    edit(thisModule);
    setIsModalVisible(2);
    console.log(isModalVisible);
  };

  const handleClickUpdate = (thisModule) => {
    edit(thisModule);
    setIsModalVisible(3);
  };

  const handleClickDelete = (thisModule) => {
    setIsModalVisible(4);
    edit(thisModule);
    // editId(category._id);
  };

  const handleConfirmEdit = () => {
    navigate("view");
  };

  const handleConfirmCreate = async () => {
    try {
      await reqCreateModule(moduleName, fatherId, pathId.length - 1);
      getModulesCallback();
      setIsModalVisible(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      await reqUpdateModule(
        curModule._id,
        moduleName,
        curModule.father_id,
        curModule.level,
        curModule.materials
      );
      setIsModalVisible(0);
      getModulesCallback();
      // if (result.status === 0) {
      //   setIsModalVisible(0);
      // } else if (result.status === 1) {
      //   message.error("Some Error Occurred!");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const handleParamsFromAddNewModule = (value, status) => {
    setModuleName(value);
    setOkDisabled(status);
  };

  const handleConfirmDelete = async () => {
    try {
      await reqDeleteModule(curModule._id);
      setIsModalVisible(0);
      getModulesCallback();
      // if (result.status === 0) {
      //   setIsModalVisible(0);
      // } else if (result.status === 1) {
      //   message.error("Some Error Occurred!");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCancel = () => {
    console.log("cancel");
    setIsModalVisible(0);
    setOkDisabled(false);
  };

  const columns = [
    {
      title: "Module Name",
      dataIndex: "name",
      key: "module",
    },
    {
      title: "Actions",
      key: "Actions",
      width: 300,
      render: (thisModule) => (
        <Space size={"middle"}>
          <LinkButton onClick={() => handleClickExpand(thisModule)}>
            Expand
          </LinkButton>
          <LinkButton onClick={() => handleClickView(thisModule)}>
            View
          </LinkButton>
          <LinkButton onClick={() => handleClickUpdate(thisModule)}>
            Update
          </LinkButton>
          <LinkButton onClick={() => handleClickDelete(thisModule)}>
            Delete
          </LinkButton>
        </Space>
      ),
    },
  ];

  // callback functions
  const getModulesCallback = useCallback(() => {
    (async function () {
      try {
        setLoading(true);
        const result = await reqModules(fatherId);
        console.log(result);
        setLoading(false);
        setModules(result);
      } catch (err) {
        console.log(err.msg);
      }
    })();
  }, [fatherId]);

  const renderTitle = () => {
    return title.map((t, l) => {
      if (l === title.length - 1) {
        return <span key={t}>{t}</span>;
      } else {
        return (
          <span key={t}>
            <span
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => {
                setFatherId(pathId[l]);
                setPathId(pathId.slice(0, l + 1));
                setTitle(title.slice(0, l + 1));
              }}
            >
              {t}
            </span>
            <span>{" > "}</span>
          </span>
        );
      }
    });
  };

  useEffect(() => {
    getModulesCallback();
  }, [fatherId, getModulesCallback]);

  return (
    <Card title={renderTitle()} extra={extra} style={{ width: "100%" }}>
      <Table
        bordered
        rowKey={"_id"}
        loading={loading}
        dataSource={modules}
        columns={columns}
        pagination={{ pageSize: 5 }}
      ></Table>
      <Modal
        title="Create Module"
        open={isModalVisible === 1}
        onOk={() => handleConfirmCreate()}
        onCancel={() => handleClickCancel()}
        okButtonProps={{ disabled: okDisabled }}
        destroyOnClose
      >
        <AddNewModuleForm
          update={handleParamsFromAddNewModule}
        ></AddNewModuleForm>
      </Modal>
      <Modal
        title="View Module"
        open={isModalVisible === 2}
        onOk={() => handleConfirmEdit()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could view the details of this module.</p>
      </Modal>
      <Modal
        title="Update Module"
        open={isModalVisible === 3}
        onOk={() => handleConfirmUpdate()}
        onCancel={() => handleClickCancel()}
        okButtonProps={{ disabled: okDisabled }}
        destroyOnClose
      >
        <UpdateModuleForm
          update={handleParamsFromAddNewModule}
        ></UpdateModuleForm>
      </Modal>
      <Modal
        title="Delete Module"
        open={isModalVisible === 4}
        onOk={() => handleConfirmDelete()}
        onCancel={() => handleClickCancel()}
      >
        <p>Are you sure to delete this...</p>
      </Modal>
    </Card>
  );
}

export default connect((state) => ({ curModule: state.curModule }), {
  edit: createEditAction,
})(ModuleList);
