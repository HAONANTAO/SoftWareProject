import React, { useState } from "react";
import { Card, Button, Modal, Form, Divider, Input } from "antd";
import "./TextMaterialDisplay.less"; // Import styles
import { reqUpdateTextMaterial, reqDeleteMaterial } from "../../api";

const { TextArea } = Input;

function TextMaterialDisplay(props) {
  const { id, name, content, callback, deleteCallback } = props;

  const [form] = Form.useForm();

  const [curName, setCurName] = useState(name);
  const [curContent, setCurContent] = useState(content);

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
    setCurContent(content);
    setIsModalvisible(0);
  };
  const handleClickOK = async () => {
    try {
      await reqUpdateTextMaterial(id, curName, curContent);
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
    console.log("handle change:", allValue);
    setCurName(allValue.name || curName);
    setCurContent(allValue.content || curContent);
  };

  return (
    <Card
      title={curName || "Default Name"}
      size="small"
      extra={extra}
      className="card-container"
    >
      <p className="text-content">{curContent || "Default Description"}</p>
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
        className="update-area"
        destroyOnClose
      >
        <Form
          form={form}
          preserve={false}
          onValuesChange={(_, allValue) => handleChange(allValue)}
        >
          <p>Update this material</p>
          <Divider></Divider>
          <div>Material Name</div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Module name can not be empty!",
              },
              {
                pattern: /^[\w\s]+$/,
                message: "Please input number, letter or underline!",
              },
            ]}
          >
            <Input defaultValue={curName}></Input>
          </Form.Item>
          <div>Content</div>
          <Form.Item name="content">
            <TextArea defaultValue={curContent}></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default TextMaterialDisplay;
