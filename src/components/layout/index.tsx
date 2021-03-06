import React, { useState, useEffect } from "react";
import { Layout as LayoutUI, Menu, Avatar, Space, Divider, Button } from "antd";
import avatarLogo from "/icon-72x72.png";
const { Header, Content, Footer, Sider } = LayoutUI;
import { useHistory } from "react-router";
import AuthButton from "../auth-button";
import s from "./layout.module.scss";
import { IComponentOfApp } from "../../types/defined";

interface ILayout extends IComponentOfApp {
  children?: any;
}
export const Layout = (props: ILayout) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState(["/"]);
  const router = useHistory();

  const onMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  useEffect(() => {
    setSelectedMenuKey([router.location.pathname]);
  }, [router.location.pathname]);

  return (
    <LayoutUI className={s.layout}>
      <Header className={s.header}>
        <Space size="middle">
          <Avatar src={avatarLogo} size={50} />
          <Menu
            mode="horizontal"
            selectedKeys={selectedMenuKey}
            onClick={onMenuClick}
          >
            <Menu.Item key="/">首页</Menu.Item>
            <Menu.Item key="/spotlights">热点</Menu.Item>
          </Menu>
        </Space>

        <Space split={<Divider type="vertical" />}>
          <AuthButton {...props} />
          <Button type="primary">写文章</Button>
        </Space>
      </Header>

      <LayoutUI className={s.subLayout}>
        <Content className={s.content}>{props.children}</Content>
        <Sider className={s.sider}>Sider</Sider>
      </LayoutUI>

      <Footer style={{ textAlign: "center" }}>创作分享平台 2021</Footer>
    </LayoutUI>
  );
};
