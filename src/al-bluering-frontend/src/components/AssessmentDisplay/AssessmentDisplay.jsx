import React, { useState } from "react";
import { Card, Button, Modal, Form, Divider, Input, List } from "antd";
import { reqUpdateAssessment, reqDeleteMaterial } from "../../api";

import "./AssessmentDisplay.less";
import CreateQuestionsForm from "../CreateQuestionsForm/CreateQuestionsForm";
const { TextArea } = Input;

function AssessmentDisplay(props) {
  const { id, name, description, questions, callback, deleteCallback } = props;

  const [form] = Form.useForm();

  const [curName, setCurName] = useState(name);
  const [curDesc, setCurDesc] = useState(description);
  const [curQuestions, setCurQuestions] = useState(questions);

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
    setIsModalvisible(0);
  };
  const handleClickOK = async () => {
    try {
      await reqUpdateAssessment(
        id,
        curName || name,
        true,
        curQuestions || questions,
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
    setCurName(allValue.name);
    setCurDesc(allValue.description);
  };

  const getQuestions = (questionsData) => {
    console.log("get questions", questionsData);
    setCurQuestions(questionsData);
  };

  const parseList = () => {
    return questions.map((item, index) => {
      return {
        id: item.id,
        correctAnswer: item.correctAnswer,
        question: item.question,
        choices: item.choices.map((i, index) => {
          const { id, choice } = i;
          return { id: id, choice: choice };
        }),
      };
    });
  };

  const handleRenderItem = (item, index) => {
    const { id, question, choices, correctAnswer, _id } = item;
    const choicesDisplay = choices.map((item, index) => {
      return (
        <List.Item key={item._id}>
          <div
            id={correctAnswer === index + 1 ? _id : ""}
            className="unshown-answer"
          >
            <span>{item.choice}</span>
          </div>
        </List.Item>
      );
    });

    const handleClickShowAnswer = () => {
      let target = document.getElementById(_id);
      target.classList.contains("correct-answer")
        ? target.classList.replace("correct-answer", "unshown-answer")
        : target.classList.replace("unshown-answer", "correct-answer");
    };

    const extra = (
      <Button
        ghost
        type="primary"
        size="small"
        onClick={(e) => handleClickShowAnswer(e)}
      >
        Show Answer
      </Button>
    );
    return (
      <List.Item key={_id}>
        <Card
          extra={extra}
          size="small"
          type="inner"
          style={{ width: "100%", marginLeft: "10%", marginRight: "10%" }}
          title={"Question " + id}
        >
          <List
            size="small"
            header={
              <div className="assessment-question-statement">{question}</div>
            }
          >
            {choicesDisplay}
          </List>
        </Card>
      </List.Item>
    );
  };

  return (
    <Card
      title={curName || "Default Name"}
      size="small"
      extra={extra}
      className="card-container"
    >
      <p className="assessment-desc">{curDesc || "Default Description"}</p>
      <List
        dataSource={questions}
        renderItem={(item) => handleRenderItem(item)}
      />
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
          <p className="section-title">Update Assessment</p>
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
          <CreateQuestionsForm
            getQuestions={getQuestions}
            defaultQuestionList={parseList()}
          ></CreateQuestionsForm>
        </Form>
      </Modal>
    </Card>
  );
}

export default AssessmentDisplay;
