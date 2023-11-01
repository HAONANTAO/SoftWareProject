import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Descriptions, Input, message } from "antd";
import "./CoachView.less";

import { reqUpdateCoach, reqDeleteCoach } from "../../../../api";

// redux
import { connect } from "react-redux";
import { createSelectCoachAction } from "../../../../redux/actions/curCoach";

function CoachView(props) {
  const { curCoach, selectCoach } = props;
  const [coachData, setCoachData] = useState({});

  // useNavigate
  const navigate = useNavigate();

  const getCoachInfoCallback = useCallback(() => {
    (async () => {
      try {
        setCoachData(curCoach);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [curCoach]);

  useEffect(() => {
    getCoachInfoCallback();
    return () => {
      selectCoach({});
    };
  }, [getCoachInfoCallback, selectCoach]);

  const [isModalOpen, setIsModalOpen] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isOkDisable, setIsOkDisable] = useState(true);

  const handleInputChange = (label) => (e) => {
    setCoachData((prevData) => ({
      ...prevData,
      [label]: e.target.value,
    }));
  };

  const handleClickOK = async () => {
    if (isEditing) {
      try {
        await reqUpdateCoach(
          coachData._id,
          coachData.firstName,
          coachData.middleName,
          coachData.lastName,
          coachData.loginID,
          coachData.password,
          coachData.description,
          coachData.age,
          coachData.address,
          coachData.phone
        );
      } catch (err) {
        message.error(err);
      }
    }

    setIsEditing(!isEditing);
    setIsModalOpen(false);
  };

  const handleClickDelete = () => {
    setIsModalOpen(2);
    setIsOkDisable(true);
    setTimeout(() => {
      setIsOkDisable(false);
    }, 5000);
  };
  const handleConfirmDeleteCoach = async () => {
    try {
      await reqDeleteCoach(curCoach._id);
      navigate("/coach");
    } catch (err) {
      message.error(err);
    }
  };

  const processChildren = (label, defaultText) => {
    if (label === "description") {
      return (
        <Input.TextArea
          className={isEditing ? "custom-input" : "custom-display"}
          value={coachData[label] || ""}
          onChange={handleInputChange(label)}
          placeholder={defaultText}
          rows={5}
        />
      );
    }
    return (
      <Input
        style={{ border: "none" }}
        className={isEditing ? "custom-input" : "custom-display"}
        value={coachData[label] || ""}
        onChange={handleInputChange(label)}
      />
    );
  };

  return (
    <div className="coachviewEdit">
      <Descriptions
        className="coachviewEdit-description"
        size="middle"
        extra={
          <div className="button-area">
            <Button
              type="primary"
              size="small"
              danger
              onClick={() => handleClickDelete()}
              disabled={isEditing}
            >
              Delete Account
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => setIsModalOpen(1)}
            >
              {isEditing ? "Update" : "Edit"}
            </Button>
          </div>
        }
        bordered
        layout="vertical"
        title="Coach Info"
      >
        <Descriptions.Item label="First Name">
          {processChildren("firstName", "This guy does not have a first name?")}
        </Descriptions.Item>
        <Descriptions.Item label="Middle Name">
          {processChildren(
            "middleName",
            "This guy does not have a middle name?"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {processChildren("lastName", "this guy do not have last name??")}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {processChildren(
            "address",
            "This guy is lazy to write address information"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {processChildren(
            "phone",
            "This guy might not have the phone numbers"
          )}
        </Descriptions.Item>
        <Descriptions.Item label=""></Descriptions.Item>
        <Descriptions.Item label="Description">
          {processChildren(
            "description",
            "This guy is lazy to write description"
          )}
        </Descriptions.Item>
      </Descriptions>

      <Modal
        title={!isEditing ? "Edit" : "Save"}
        open={isModalOpen === 1}
        onOk={() => handleClickOK()}
        onCancel={() => setIsModalOpen(0)}
      >
        <p>
          {!isEditing
            ? "Do you want to edit the coach info..."
            : "Do you want to save the changes..."}
        </p>
      </Modal>
      <Modal
        title={"Delete Coach"}
        open={isModalOpen === 2}
        onOk={() => handleConfirmDeleteCoach()}
        okButtonProps={{ disabled: isOkDisable }}
        onCancel={() => setIsModalOpen(0)}
      >
        <p>{"Are you sure to delete this coach..."}</p>
        <p>{"Wait 5 seconds to confirm deleting."}</p>
      </Modal>
    </div>
  );
}

export default connect((state) => ({ curCoach: state.curCoach }), {
  selectCoach: createSelectCoachAction,
})(CoachView);
