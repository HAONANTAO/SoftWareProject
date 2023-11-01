import React from "react";
import { Form, Divider, Input } from "antd";

function CreateNewAgeGroupForm(props) {
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
      <p>Create a new Age Group</p>
      <Divider></Divider>
      <p>name: </p>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Age Group name can not be empty!",
          },
          {
            pattern: /^[-_\w\s]+$/,
            message: "Please input number, letter, dash, space or underline!",
          },
        ]}
      >
        <Input placeholder="input age group name"></Input>
      </Form.Item>
    </Form>
  );
}

export default CreateNewAgeGroupForm;
