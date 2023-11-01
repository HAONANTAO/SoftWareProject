import React, { useState, useCallback, useEffect } from "react";
import decode from "jwt-decode";
import { Button, Modal, Descriptions, Input, message } from "antd";

import "./Profile.less";
import memory from "../../../utils/storage/memoryUtils";

import { reqSingleAdmin, reqUpdateAdmin } from "../../../api";
function Profile() {
  const [profileData, setProfileData] = useState({});

  const getAdminInfoCallBack = useCallback(() => {
    (async () => {
      const id = decode(memory.user.token).uid;
      const result = await reqSingleAdmin(id);
      console.log(result);
      setProfileData(result);
    })();
  }, []);

  useEffect(() => {
    getAdminInfoCallBack();
  }, [getAdminInfoCallBack]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (label) => (e) => {
    setProfileData((prevData) => ({ ...prevData, [label]: e.target.value }));
  };

  const handleClickOK = async () => {
    if (isEditing) {
      try {
        await reqUpdateAdmin(
          profileData._id,
          profileData.firstName,
          profileData.middleName,
          profileData.lastName,
          profileData.loginID,
          profileData.password,
          profileData.description,
          profileData.age,
          profileData.address,
          profileData.phone
        );
      } catch (err) {
        message.error(err);
      }
    }
    setIsEditing(!isEditing);
    setIsModalOpen(false);
  };

  const processChildren = (label, defaultText) => {
    if (label === "description") {
      return (
        <Input.TextArea
          className={isEditing ? "custom-input" : "custom-display"}
          value={profileData[label] || ""}
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
        value={profileData[label] || ""}
        onChange={handleInputChange(label)}
      />
    );
  };

  return (
    <div className="profileEdit">
      <Descriptions
        className="profileEdit-description"
        size="middle"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => setIsModalOpen(true)}
          >
            {isEditing ? "Update" : "Edit"}
          </Button>
        }
        bordered
        layout="vertical"
        title="Admin Info"
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
        open={isModalOpen}
        onOk={() => handleClickOK()}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>
          {!isEditing
            ? "Do you want to edit info..."
            : "Do you want to save the changes..."}
        </p>
      </Modal>
    </div>
  );
}

export default Profile;
