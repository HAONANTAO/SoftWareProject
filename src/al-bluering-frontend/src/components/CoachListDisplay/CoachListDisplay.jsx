import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Modal, Table, Space, message } from "antd";
import LinkButton from "../LinkButton/LinkButton";
import CreateBtn from "../CreateBtn/CreateBtn";
import SearchArea from "../SearchArea/SearchArea";
import AddNewCoachForm from "../AddNewCoachForm/AddNewCoachForm";

import { reqAllCoaches, reqSearchCoaches, reqCreateCoach } from "../../api";

// redux
import { connect } from "react-redux";
import { createSelectCoachAction } from "../../redux/actions/curCoach";

function CoachListDisplay(props) {
  const [isModalVisible, setIsModalVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [ageGroupSelected, setAgeGroupSelected] = useState("");
  const [keyword, setKeyword] = useState("");

  const [okDisabled, setOkDisabled] = useState(false);
  const [newCoachInfo, setNewCoachInfo] = useState(null);

  const { curCoach, selectCoach } = props;
  // useNavigate
  const navigate = useNavigate();

  // callback functions
  const getCoachesCallback = useCallback(() => {
    (async function () {
      try {
        setLoading(true);
        let result = [];
        if (keyword === "") {
          result = await reqAllCoaches();
        } else {
          result = await reqSearchCoaches(keyword);
        }
        console.log(keyword, result);
        setLoading(false);
        const coachList = result.map((item) => {
          const { firstName, middleName, lastName } = item.coach;
          let name =
            middleName === ""
              ? firstName + " " + lastName
              : firstName + " " + middleName + " " + lastName;
          let ageGroup = item.ageGroup;
          return { name, ageGroup, ...item.coach };
        });
        setCoaches(coachList);
      } catch (err) {
        message.error(err);
      }
    })();
  }, [keyword]);

  useEffect(() => {
    getCoachesCallback();
  }, [getCoachesCallback]);

  // event handle functions
  const handleCreateCoach = () => {
    setIsModalVisible(1);
  };

  const handleClickView = (thisCoach) => {
    selectCoach(thisCoach);
    setIsModalVisible(2);
  };

  const handleClickCancel = () => {
    setIsModalVisible(0);
  };

  const handleClickAgeGroup = (thisAgeGroup) => {
    setAgeGroupSelected(thisAgeGroup.name);
    setIsModalVisible(3);
  };

  const handleConfirmCreate = async () => {
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
      } = newCoachInfo;
      await reqCreateCoach(
        firstName || "default first name",
        middleName || "",
        lastName || "default last name",
        loginID,
        password,
        description || "this guy is lazy to describe himself",
        age || "0",
        address || "Unk",
        phone || "Unk"
      );
      getCoachesCallback();
      setIsModalVisible(0);
    } catch (err) {
      message.error(err);
    }
  };

  const handleConfirmView = () => {
    setIsModalVisible(0);

    navigate("view");
  };

  const handleConfirmViewAG = () => {
    setIsModalVisible(0);
    navigate("/" + ageGroupSelected);
  };

  const handleKeywordChange = (keyword) => {
    console.log(keyword);
    setKeyword(keyword);
  };

  const handleUpdateFormInfo = (data, status) => {
    setNewCoachInfo(data);
    setOkDisabled(status);
  };

  const extra = (
    <CreateBtn
      title="Add new Coach"
      handleClick={() => handleCreateCoach()}
    ></CreateBtn>
  );

  const columns = [
    {
      title: "Coach Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age Group Assigned",
      dataIndex: "ageGroup",
      key: "ageGroup",
      render: (ageGroups) => {
        if (ageGroups.length === 0) {
          return <div>No Age Group Assigned</div>;
        }
        let ageGroupComponent = ageGroups.map((item) => {
          return (
            <LinkButton onClick={() => handleClickAgeGroup(item)}>
              {item.name}
            </LinkButton>
          );
        });
        return <Space size={"middle"}>{ageGroupComponent}</Space>;
      },
    },
    {
      title: "Actions",
      key: "Actions",
      width: 200,
      render: (thisCoach) => (
        <Space size={"middle"}>
          <LinkButton onClick={() => handleClickView(thisCoach)}>
            View
          </LinkButton>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <SearchArea handleKeywordChange={handleKeywordChange}></SearchArea>
      }
      extra={extra}
      style={{ width: "100%" }}
    >
      <Table
        bordered
        rowKey={"_id"}
        loading={loading}
        dataSource={coaches}
        columns={columns}
        pagination={{ pageSize: 5 }}
      ></Table>
      <Modal
        title="Create Coach"
        open={isModalVisible === 1}
        onOk={() => handleConfirmCreate()}
        onCancel={() => handleClickCancel()}
        okButtonProps={{ disabled: okDisabled }}
        destroyOnClose
      >
        <AddNewCoachForm update={handleUpdateFormInfo}></AddNewCoachForm>
      </Modal>
      <Modal
        title="View Coach"
        open={isModalVisible === 2}
        onOk={() => handleConfirmView()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could view the details of this Coach.</p>
      </Modal>
      <Modal
        title="View Age Group"
        open={isModalVisible === 3}
        onOk={() => handleConfirmViewAG()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>You could view the details of this Age Group.</p>
        <p>Click OK to navigate to Age Group page</p>
      </Modal>
    </Card>
  );
}

export default connect((state) => ({ curCoach: state.curCoach }), {
  selectCoach: createSelectCoachAction,
})(CoachListDisplay);
