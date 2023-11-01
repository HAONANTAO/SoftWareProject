import React from "react";
import { Form, Divider, Input, Space } from "antd";

function AddNewCoachForm(props) {
  const [form] = Form.useForm();

  const { update } = props;

  const handleChange = async (value) => {
    try {
      await form.validateFields();
      update(value, false);
    } catch (err) {
      update(value, err.errorFields.length !== 0);
    }
  };

  return (
    <Form
      form={form}
      preserve={false}
      onValuesChange={(_, all) => handleChange(all)}
    >
      <p>Create an account for a new Coach</p>
      <Divider></Divider>
      <div>Login ID</div>
      <Form.Item
        name="loginID"
        rules={[
          {
            required: true,
            message: "Login ID can not be empty!",
          },
          {
            pattern: /^[-_'\w]+$/,
            message: "Please input number, letter, dash or underline!",
          },
        ]}
      >
        <Input placeholder="input login ID"></Input>
      </Form.Item>
      <div>Password</div>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Password can not be empty!",
          },
          {
            pattern: /^[-'\w\s]+$/,
            message: "Please input number, letter, dash, prime or underline!",
          },
        ]}
      >
        <Input.Password placeholder="input password"></Input.Password>
      </Form.Item>
      <div>Personal Info</div>
      <Space direction="horizontal">
        <Form.Item
          name="firstName"
          rules={[
            {
              pattern: /^['\w]+$/,
              message: "Please input letter or prime!",
            },
          ]}
        >
          <Input placeholder="first name"></Input>
        </Form.Item>
        <Form.Item
          name="middleName"
          rules={[
            {
              pattern: /^['\w]+$/,
              message: "Please input letter or prime!",
            },
          ]}
        >
          <Input placeholder="middle name"></Input>
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              pattern: /^['\w]+$/,
              message: "Please input letter or prime!",
            },
          ]}
        >
          <Input placeholder="last name"></Input>
        </Form.Item>
      </Space>
      <Space direction="horizontal">
        <Form.Item
          name="age"
          rules={[
            {
              pattern: /^([1-9][0-9]{0,1}|100)$/,
              message: "number between 0 and 100",
            },
          ]}
        >
          <Input placeholder="age"></Input>
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              pattern: /^\d{10}$/,
              message: "10 digit numbers allowed",
            },
          ]}
        >
          <Input placeholder="phone"></Input>
        </Form.Item>
      </Space>
      <Form.Item name="address">
        <Input placeholder="address"></Input>
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="description"></Input.TextArea>
      </Form.Item>
    </Form>
  );
}

export default AddNewCoachForm;
