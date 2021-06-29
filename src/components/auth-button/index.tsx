import React from "react";
import { Button, Avatar, Dropdown, Menu } from "antd";
import { IUserObj } from "../../types/defined";

import { IdcardOutlined, FrownTwoTone, SmileTwoTone } from "@ant-design/icons";

interface IAuthButtonProp {
  openAuthModal: (e?: any) => void;
  userAuth: IUserObj | boolean;
}

const AuthButton = (props: IAuthButtonProp) => {
  const { openAuthModal, userAuth } = props;

  const menu = (
    <Menu>
      <Menu.Item key="board" icon={<IdcardOutlined />}>用户面板</Menu.Item>
      <Menu.Item key="logout" icon={<FrownTwoTone />}>退出登录</Menu.Item>
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
