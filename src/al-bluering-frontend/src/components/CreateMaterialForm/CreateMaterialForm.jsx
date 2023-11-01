import React, { useState } from "react";
import { Form, Divider, Input, Segmented, Select } from "antd";

import "./CreateMaterialForm.less";

import UploadFile from "../UploadFile/UploadFile";
import CreateQuestionsForm from "../CreateQuestionsForm/CreateQuestionsForm";

const { TextArea } = Input;

function CreateMaterialForm(props) {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(1);
  const [fileUrl, setFileUrl] = useState("");
  const [questions, setQuestions] = useState([]);

  const { update, size } = props;

  const handleChange = async (formNo, allValue) => {
    try {
      console.log(allValue, false, formNo);
      if (formNo === 1) {
        await form1.validateFields();
        update(allValue, false, formNo);
      } else if (formNo === 2) {
        await form2.validateFields();
        update(allValue, fileUrl === "", formNo);
      } else if (formNo === 3) {
        await form3.validateFields();
        update(allValue, false, formNo);
      }
    } catch (err) {
      console.log(err);
      if (formNo === 2) {
        update(
          { ...allValue, url: fileUrl },
          (err.errorFields.length === 0) & (fileUrl !== "") ? false : true,
          formNo
        );
      } else if (formNo === 3) {
        update(
          { ...allValue, questions: questions },
          (err.errorFields.length === 0) & (questions.length !== 0)
            ? false
            : true,
          formNo
        );
      } else {
        update(allValue, err.errorFields.length === 0 ? false : true, formNo);
      }
    }
  };

  const getFileUrl = async (url) => {
    setFileUrl(url);
    try {
      await form2.validateFields();
      update({ ...form2.getFieldsValue(), url }, false, 2);
    } catch (err) {
      update(
        { ...form2.getFieldsValue(), url },
        (err.errorFields.length === 0) & (url !== "") ? false : true,
        2
      );
    }
  };

  const getQuestions = async (questionsData) => {
    console.log("get questions", questionsData);
    setQuestions(questionsData);
    try {
      await form3.validateFields();
      update({ ...form3.getFieldsValue(), questions: questionsData }, false, 3);
    } catch (err) {
      update(
        { ...form3.getFieldsValue(), questions: questionsData },
        (err.errorFields.length === 0) & (questionsData.length !== 0)
          ? false
          : true,
        3
      );
    }
  };

  const handleSwitchSegmented = (tag) => {
    if (tag === "Text") {
      setIsModalVisible(1);
    } else if (tag === "File") {
      setIsModalVisible(2);
    } else if (tag === "Assessment") {
      setIsModalVisible(3);
    }
  };

  const generatePositionOptions = () => {
    let result = [];
    for (let i = 0; i <= size; i++) {
      result[i] = { label: i + 1, value: i + 1 };
    }
    return result;
  };

  return (
    <div>
      <Segmented
        options={["Text", "File", "Assessment"]}
        onChange={(tag) => handleSwitchSegmented(tag)}
      ></Segmented>
      <Form
        onValuesChange={(_, all) => handleChange(1, all)}
        form={form1}
        preserve={false}
        style={isModalVisible === 1 ? {} : { display: "none" }}
      >
        <Divider></Divider>
        <p className="section-title">Create a Text Material</p>
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
              message: "Please input number, letter, dash, prime or underline!",
            },
          ]}
        >
          <Input placeholder="input a new name of this Material"></Input>
        </Form.Item>
        <div>Content</div>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Material name can not be empty!",
            },
          ]}
        >
          <TextArea placeholder="input something"></TextArea>
        </Form.Item>
        <div>Position</div>
        <Form.Item
          name="order"
          rules={[
            {
              required: true,
              message: "You must choose a position to insert!",
            },
          ]}
        >
          <Select
            defaultValue="select position you want to insert"
            options={generatePositionOptions()}
          />
        </Form.Item>
      </Form>

      <Form
        onValuesChange={(_, all) => handleChange(2, all)}
        form={form2}
        preserve={false}
        style={isModalVisible === 2 ? {} : { display: "none" }}
      >
        <Divider></Divider>
        <p className="section-title">Create a File Material</p>
        <div className="item-title">Name</div>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Material name can not be empty!",
            },
            {
              pattern: /^[-'\w\s]+$/,
              message: "Please input number, letter, dash, prime or underline!",
            },
          ]}
        >
          <Input placeholder="input a new name of this Material"></Input>
        </Form.Item>
        <div>Description</div>
        <Form.Item name="description">
          <TextArea placeholder="input something"></TextArea>
        </Form.Item>
        <UploadFile getFileUrl={getFileUrl}></UploadFile>
        <div>Position</div>
        <Form.Item
          name="order"
          rules={[
            {
              required: true,
              message: "You must choose a position to insert!",
            },
          ]}
        >
          <Select
            defaultValue="select position you want to insert"
            options={generatePositionOptions()}
          />
        </Form.Item>
      </Form>

      <Form
        onValuesChange={(_, all) => handleChange(3, all)}
        form={form3}
        preserve={false}
        style={isModalVisible === 3 ? {} : { display: "none" }}
      >
        <Divider></Divider>
        <p className="section-title">Create a Assessment Material</p>
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
              message: "Please input number, letter, dash, prime or underline!",
            },
          ]}
        >
          <Input placeholder="input a new name of this Material"></Input>
        </Form.Item>
        <div className="item-title">Description</div>
        <Form.Item name="description">
          <TextArea placeholder="input something"></TextArea>
        </Form.Item>
        <CreateQuestionsForm
          getQuestions={getQuestions}
          defaultQuestionList={[]}
        ></CreateQuestionsForm>

        <div>Position</div>
        <Form.Item
          name="order"
          rules={[
            {
              required: true,
              message: "You must choose a position to insert!",
            },
          ]}
        >
          <Select
            defaultValue="select position you want to insert"
            options={generatePositionOptions()}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateMaterialForm;
