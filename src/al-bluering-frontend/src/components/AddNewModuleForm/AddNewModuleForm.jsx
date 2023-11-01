import React from "react";
import { Form, Divider, Input } from "antd";

function AddNewModuleForm(props) {
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
      <p>Add a new module as submodule of current Module</p>
      <Divider></Divider>
      <div>Name</div>
      <Form.Item
        name="moduleName"
        rules={[
          {
            required: true,
            message: "module name can not be empty!",
          },
          {
            pattern: /^[-'\w\s]+$/,
            message: "Please input number, letter, dash, prime or underline!",
          },
        ]}
      >
        <Input
          placeholder="input name of a new Module"
          onChange={(event) => handleChange(event.target.value)}
        ></Input>
      </Form.Item>
    </Form>
  );
}

export default AddNewModuleForm;
