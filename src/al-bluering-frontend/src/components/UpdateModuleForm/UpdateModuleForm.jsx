import React from "react";
import { Form, Divider, Input } from "antd";

function UpdateModuleForm(props) {
  const [form] = Form.useForm();

  const { update } = props;

  const handleChange = async (value) => {
    try {
      await form.validateFields();
      update(value, false);
    } catch (err) {
      update(value, true);
    }
  };

  return (
    <Form form={form} preserve={false}>
      <p>Update Module Info</p>
      <Divider></Divider>
      <div>New Name</div>
      <Form.Item
        name="categorieName"
        rules={[
          {
            required: true,
            message: "Category name can not be empty!",
          },
          {
            pattern: /^[-'\w]+$/,
            message: "Please input number, letter, dash, prime or underline!",
          },
        ]}
      >
        <Input
          placeholder="input a new name of this Module"
          onChange={(event) => handleChange(event.target.value)}
        ></Input>
      </Form.Item>
    </Form>
  );
}

export default UpdateModuleForm;
