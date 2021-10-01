import React from "react";
import { Button, Avatar, Dropdown, Menu } from "antd";
import { IUserObj } from "../../types/defined";

import { IdcardOutlined, FrownTwoTone, SmileTwoTone } from "@ant-design/icons";
import UserAuthModalView from "../../views/modal-views/user-auth";
import { useModal } from "../modal";
import { dispatch } from "../../actions";
import { HANDLE_USER_SIGNUP, HANDLE_USER_LOGIN } from "../../constants";
interface IAuthButtonProp {
  userAuth: IUserObj | boolean;
}

const AuthButton = (props: IAuthButtonProp) => {
  const { userAuth } = props;

  const modal = useModal();

  const openAuthModal = () => {
    modal.setState((draft: any) => {
      draft.modal = {
        ...draft.modal,
        visible: true,
        content: (
          <UserAuthModalView
            userAuth={userAuth}
            updateState={modal.setState}
            onSubmit={handleSubmit}
          />
        ),
        title: "开启你的创作旅程",
        type: 1,
        noFooter: true,
      };
    });
  };

  const handleSubmit = (values: any, type: number) =>
    type === 0
      ? dispatch({ type: HANDLE_USER_LOGIN, payload: values }).then(() => {
          modal.setState((draft: { visible: boolean; }) => {
            draft.visible = false;
          });
        })
      : dispatch({ type: HANDLE_USER_SIGNUP, payload: values }).then(() => {
          modal.setState((draft: { visible: boolean; }) => {
            draft.visible = false;
          });
        });

  const menu = (
    <Menu>
      <Menu.Item key="board" icon={<IdcardOutlined />}>
        用户面板
      </Menu.Item>
      <Menu.Item key="logout" icon={<FrownTwoTone />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return userAuth ? (
    <Dropdown overlay={menu}>
      <Avatar src={<SmileTwoTone />} size={64} />
    </Dropdown>
  ) : (
    <Button type="link" onClick={openAuthModal}>
      登录/注册
    </Button>
  );
};

export default AuthButton;
