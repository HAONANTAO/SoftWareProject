import React, { useCallback, useEffect, useState } from "react";
import decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import LinkButton from "../LinkButton/LinkButton";

import "./MyHeader.less";
import { Modal } from "antd";

import { getTitle } from "../../config/menuConfig";
import memory from "../../utils/storage/memoryUtils";
import storage from "../../utils/storage/storageUtils";

import { connect } from "react-redux";

import { reqSingleAdmin } from "../../api";

function TopHeader(props) {
  const { curTag} = props;
  const [adminName, setAdminName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigator = useNavigate();

  const getAdminInfoCallBack = useCallback(() => {
    (async () => {
      const id = decode(memory.user.token).uid;
      const result = await reqSingleAdmin(id);
      setAdminName(result.firstName);
    })();
  }, []);

  useEffect(() => {
    getAdminInfoCallBack();
  }, [curTag, getAdminInfoCallBack]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    storage.deleteUser();
    memory.user = {};
    navigator("/login");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="top-nav">
      <div className="top-nav-top">
        <span>Welcome,</span>
        <span>{adminName}</span>
        <LinkButton onClick={showModal}>Exit</LinkButton>
      </div>
      <div className="top-nav-bottom">
        <div className="top-nav-bottom-left">{getTitle(curTag[0])}</div>
        <div className="top-nav-bottom-right"></div>
      </div>
      <Modal
        title="Exit..."
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to log out? You will back to login page.</p>
      </Modal>
    </div>
  );
}

export default connect(
  (state) => ({ curTag: state.curTag, curHeader: state.curHeader }),
  {}
)(TopHeader);
