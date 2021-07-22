import React, { useState, useEffect } from "react";
import { Form, Input, Space, Button } from "antd";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserAuthModalView = (props: {
  updateState: any;
  userAuth: any;
  onSubmit: any;
}) => {
  const { updateState, onSubmit } = props;
  const [form] = Form.useForm();

  // type 1 signup type 0 login;
  const [type, setFlagType] = useState(0);

  useEffect(() => {
    form.setFieldsValue({
      authType: type,
    });
  }, [type]);

  const onValuesChange = (
    changedValues: any,
    allValues: {
      displayName: string;
      password: string;
      email?: string;
      phone?: string;
      authType: number;
    }
  ) => {
    updateState((draft: any) => {
      draft.authType = allValues.authType;
    });
  };

  const goBack = () => {
    updateState((draft: { modal: { visible: boolean } }) => {
      draft.modal.visible = false;
    });
  };

  const setTypeValue = () => {
    setFlagType((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <Form
      {...layout}
      onValuesChange={onValuesChange}
      form={form}
      onFinish={(values) => onSubmit(values, type)}
      name="control-hooks"
    >
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.authType !== currentValues.authType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("authType") === 1 ? (
            <Form.Item
              name="displayName"
              label="展示名"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* 密码 */}
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      {/* 新用户 输出确认密码 */}
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.authType !== currentValues.authType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("authType") === 1 ? (
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
          <Button htmlType="button" onClick={goBack}>
            取消
          </Button>
        </Space>
        <Button type="link" htmlType="button" onClick={setTypeValue}>
          我要{!type ? "注册" : "登录"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAuthModalView;
