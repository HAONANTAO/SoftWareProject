import React, { useState } from "react";
import { Card, Button, Modal, Form, Divider, Input } from "antd";
import { reqUpdateFileMaterial, reqDeleteMaterial } from "../../api";

import UploadFile from "../UploadFile/UploadFile";

import "./FileMaterialDisplay.less";

const { TextArea } = Input;

function FileMaterialDisplay(props) {
  const { id, name, description, url, callback, deleteCallback } = props;

  const [form] = Form.useForm();

  const [curName, setCurName] = useState(name);
  const [curDesc, setCurDesc] = useState(description);
  const [curUrl, setCurUrl] = useState(url);

  const [isModalVisible, setIsModalvisible] = useState(0);
  const extra = (
    <div className="button-area">
      <Button type="primary" ghost size="small" onClick={() => handleUpdate()}>
        Update
      </Button>
      <Button type="primary" ghost size="small" onClick={() => handleDelete()}>
        Delete
      </Button>
    </div>
  );

  const handleUpdate = () => {
    setIsModalvisible(1);
  };
  const handleDelete = () => {
    setIsModalvisible(2);
  };
  const handleClickCancel = () => {
    setCurName(name);
    setCurDesc(description);
    setCurUrl(url);
    setIsModalvisible(0);
  };
  const handleClickOK = async () => {
    try {
      await reqUpdateFileMaterial(
        id,
        curName || name,
        curUrl || url,
        curDesc || description
      );
      callback();
      setIsModalvisible(0);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCrnfirmDelete = async () => {
    try {
      await reqDeleteMaterial(id);
      callback();
      deleteCallback();
      setIsModalvisible(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (allValue) => {
    setCurName(allValue.name || name);
    setCurDesc(allValue.description || description);
    setCurUrl(curUrl || url);
  };

  const getFileUrl = (url) => {
    setCurUrl(url);
  };

  return (
    <Card
      title={curName || "Default Name"}
      size="small"
      extra={extra}
      className="card-container"
    >
      <div>
        {curUrl ? (
          <>
            {["jpg", "jpeg", "png", "gif"].includes(
              curUrl?.split(".").pop().split("?")[0].toLowerCase()
            ) ? (
              <img
                src={curUrl}
                alt="Uploaded content"
                style={{ maxHeight: "200px" }}
              />
            ) : (
              <p>
                This is a {curUrl?.split(".").pop().split("?")[0].toUpperCase()}{" "}
                file.{" "}
                <a href={curUrl} target="_blank" rel="noopener noreferrer">
                  Download to view.
                </a>
              </p>
            )}
          </>
        ) : (
          <p>No file to display</p>
        )}
      </div>
      <Divider></Divider>
      <p className="file-material-desc">{curDesc || "Default Description"}</p>
      <Modal
        title="Delete Module"
        open={isModalVisible === 2}
        onOk={() => handleCrnfirmDelete()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <p>Are you sure to remove this material...</p>
      </Modal>
      <Modal
        title="Update Module"
        open={isModalVisible === 1}
        onOk={() => handleClickOK()}
        onCancel={() => handleClickCancel()}
        destroyOnClose
      >
        <Form
          onValuesChange={(_, all) => handleChange(all)}
          form={form}
          preserve={false}
        >
          <Divider></Divider>
          <p className="section-title">Create a File Material</p>
          <div className="item-title">Name</div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Text material name can not be empty!",
              },
              {
                pattern: /^[-'\w\s]+$/,
                message:
                  "Please input number, letter, dash, prime or underline!",
              },
            ]}
          >
            <Input defaultValue={name}></Input>
          </Form.Item>
          <div>Description</div>
          <Form.Item name="description">
            <TextArea defaultValue={description}></TextArea>
          </Form.Item>
          <p>Upload a new file</p>
          <UploadFile getFileUrl={getFileUrl}></UploadFile>
        </Form>
      </Modal>
    </Card>
  );
}

export default FileMaterialDisplay;
