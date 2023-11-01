import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginTable(props) {
  const onFinish = (values) => {
    props.getLoginInfo(values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
            message: "Please input correct email.",
          },
        ]}
        validateFirst={true}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            pattern: /^[\w]+$/,
            message: "Please input only numbers, letters or underline.",
          },
          {
            min: 4,
            message: "Please input no less than 4 letters!",
          },
          {
            max: 12,
            message: "Please input no more than 12 letters!",
          },
        ]}
        validateFirst={true}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <br />
        <br />
        <Button type="primary" ghost>
          <a href="http://54.253.210.17">{"Login As a Coach >"}</a>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginTable;
