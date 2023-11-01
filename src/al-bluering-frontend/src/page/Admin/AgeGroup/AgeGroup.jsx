import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Modal, Table, Space, message, Button } from "antd";
import LinkButton from "../../../components/LinkButton/LinkButton";
import ModifyCoachesForm from "../../../components/ModifyCoachesForm/ModifyCoachesForm";
import ModifyModulesForm from "../../../components/ModifyModulesForm/ModifyModulesForm";

import { reqGetAgeGroup, reqUpdateAgeGroup } from "../../../api";

// redux
import { connect } from "react-redux";
import { createSelectCoachAction } from "../../../redux/actions/curCoach";
import { createEditAction } from "../../../redux/actions/module";
function AgeGroup(props) {
  const [isModalVisible, setIsModalVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [coachList, setCoachList] = useState([]);
  const [ageGroupId, setAgeGroupId] = useState("");

  const [newModuleList, setNewModuleList] = useState([]);
  const [newCoachList, setNewCoachList] = useState([]);

  // useNavigate
  const navigate = useNavigate();

  const { cata, curCoach, selectCoach, curModule, selectModule } = props;

  const getAgeGroupCallback = useCallback(() => {
    (async function () {
      try {
        setLoading(true);
        let result = await reqGetAgeGroup(cata);
        console.log(result);
        let cList = result[0].coaches.map((item) => {
          const { firstName, middleName, lastName } = item;
          let name =
            middleName === ""
              ? firstName + " " + lastName
              : firstName + " " + middleName + " " + lastName;
          return { name, ...item };
        });
        setLoading(false);
        setModuleList(result[0].modules);
        setCoachList(cList);
        setAgeGroupId(result[0]._id);
      } catch (err) {
        message.error(err);
      }
    })();
  }, [cata]);

  useEffect(() => {
    getAgeGroupCallback();
  }, [getAgeGroupCallback]);

  const handleClickCancel = () => {
    setIsModalVisible(0);
  };

  const handleClickViewCoach = (thisCoach) => {
    selectCoach(thisCoach);
    setIsModalVisible(2);
  };

  const handleClickViewModule = (thisModule) => {
    selectModule(thisModule);
    setIsModalVisible(3);
  };

  const handleConfirmViewCoach = () => {
    setIsModalVisible(0);
    navigate("/coach/view");
  };

  const handleConfirmViewModule = () => {
    setIsModalVisible(0);
    navigate("/module/view");
  };

  const handleClickRemoveCoach = (thisCoach) => {
    selectCoach(thisCoach);
    setIsModalVisible(4);
  };

  const handleClickRemoveModule = (thisModule) => {
    selectModule(thisModule);
    setIsModalVisible(5);
  };

  const handleConfirmRemove = async () => {
    try {
      let nCoachList = [...coachList];
      let nModuleList = [...moduleList];
      if (isModalVisible === 4) {
        nCoachList.splice(nCoachList.indexOf(curCoach), 1);
      } else if (isModalVisible === 5) {
        nModuleList.splice(nModuleList.indexOf(curModule), 1);
      }
      let ncIDList = nCoachList.map((item) => {
        return item._id;
      });
      let nmIDList = nModuleList.map((item) => {
        return item._id;
      });
      await reqUpdateAgeGroup(ageGroupId, cata, ncIDList, nmIDList);
      getAgeGroupCallback();
    } catch (err) {
      message.error(err);
    }
    setIsModalVisible(0);
  };

  const handleUpdateList = (cList, mList, mode) => {
    setNewCoachList(cList);
    setNewModuleList(mList);
    if (mode === 0) {
      let processedMList = mList.map((item) => {
        return item._id;
      });
      setNewModuleList(processedMList);
    } else if (mode === 1) {
      let processedCList = cList.map((item) => {
        return item._id;
      });
      setNewCoachList(processedCList);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      console.log(newCoachList, newModuleList);
      await reqUpdateAgeGroup(ageGroupId, cata, newCoachList, newModuleList);
      getAgeGroupCallback();
      setIsModalVisible(0);
    } catch (err) {
      message.error(err);
    }
  };

  const coachColumns = [
    {
      title: "Coach Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "Actions",
      width: 200,
      render: (thisCoach) => (
        <Space size={"middle"}>
          <LinkButton onClick={() => handleClickViewCoach(thisCoach)}>
            View
          </LinkButton>
          <LinkButton onClick={() => handleClickRemoveCoach(thisCoach)}>
            Remove
          </LinkButton>
        </Space>
      ),
    },
  ];

  const moduleColumns = [
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Module Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Actions",
      key: "Actions",
      width: 200,
      render: (thisModule) => (
        <Space size={"middle"}>
          <LinkButton onClick={() => handleClickViewModule(thisModule)}>
            View
          </LinkButton>
          <LinkButton onClick={() => handleClickRemoveModule(thisModule)}>
            Remove
          </LinkButton>
        </Space>
      ),
    },
  ];

  return (
    <Card title={cata} style={{ width: "100%" }}>
      <Card
        title={"Coaches Assigned"}
        extra={
          <Button type="primary" ghost onClick={() => setIsModalVisible(6)}>
            Modify Coach
          </Button>
        }
        style={{ width: "100%" }}
        type="inner"
      >
        <Table
          bordered
          rowKey={"_id"}
          loading={loading}
          dataSource={coachList}
          columns={coachColumns}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Card>
      <Card
        title={"Modules Assigned"}
        extra={
          <Button type="primary" ghost onClick={() => setIsModalVisible(7)}>
            Modify Module
          </Button>
        }
        style={{ width: "100%" }}
        type="inner"
      >
        <Table
          bordered
          rowKey={"_id"}
          loading={loading}
          dataSource={moduleList}
          columns={moduleColumns}
          pagination={{ pageSize: 5 }}
        ></Table>
      </Card>
      <Modal
        title="View Coach"
        open={isModalVisible === 2}
        onOk={() => handleConfirmViewCoach()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could view the details of this Coach.</p>
      </Modal>
      <Modal
        title="View Module"
        open={isModalVisible === 3}
        onOk={() => handleConfirmViewModule()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could view the details of this Module.</p>
      </Modal>
      <Modal
        title="Remove Coach"
        open={isModalVisible === 4}
        onOk={() => handleConfirmRemove()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could remove this coach from current age group.</p>
      </Modal>
      <Modal
        title="Remove Module"
        open={isModalVisible === 5}
        onOk={() => handleConfirmRemove()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could remove this module from current age group</p>
      </Modal>
      <Modal
        title="Modify Coach"
        open={isModalVisible === 6}
        onOk={() => handleConfirmUpdate()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <ModifyCoachesForm
          assignedCoaches={coachList}
          update={(cList) => handleUpdateList(cList, moduleList, 0)}
        ></ModifyCoachesForm>
      </Modal>
      <Modal
        title="Modify Module"
        open={isModalVisible === 7}
        onOk={() => handleConfirmUpdate()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <ModifyModulesForm
          assignedModules={moduleList}
          update={(mList) => handleUpdateList(coachList, mList, 1)}
        ></ModifyModulesForm>
      </Modal>
    </Card>
  );
}

export default connect(
  (state) => ({ curCoach: state.curCoach, curModule: state.curModule }),
  {
    selectCoach: createSelectCoachAction,
    selectModule: createEditAction,
  }
)(AgeGroup);
