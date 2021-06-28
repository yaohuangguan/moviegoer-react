import React, { useState, useEffect } from "react";
import {
  Layout as LayoutUI,
  Menu,
  Avatar,
  Space,
  Divider,
  Typography,
} from "antd";
import avatarLogo from "/icon-72x72.png";
const { Header, Content, Footer } = LayoutUI;
import { useHistory, withRouter } from "react-router";
import s from "./layout.module.scss";
export const Layout = withRouter((props) => {
  const router = useHistory();
  console.log(`router`, router);
  console.log(`props`, props);
  const [selectedMenuKey, setSelectedMenuKey] = useState(["1"]);

  const onMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  useEffect(() => {
    setSelectedMenuKey([router.location.pathname]);
  }, [router.location.pathname]);

  return (
    <LayoutUI className={s.layout}>
      <Header className={s.header}>
        <Space>
          <Avatar src={avatarLogo} size={50} />
          <Menu
            mode="horizontal"
            selectedKeys={selectedMenuKey}
            // onSelect={({ key }) => {
            //   setSelectedMenuKey([key]);
            // }}
            onClick={onMenuClick}
          >
            <Menu.Item key="/">主页</Menu.Item>
            <Menu.Item key="/blog">博客</Menu.Item>
          </Menu>
        </Space>

        <Space split={<Divider type="vertical" />}>
          <Typography.Link>登录/注册</Typography.Link>
          <Typography.Link>Github</Typography.Link>
        </Space>
      </Header>

      <Content className={s.content}>{props.children}</Content>

      <Footer style={{ textAlign: "center" }}>sam yao 2021</Footer>
    </LayoutUI>
  );
});
