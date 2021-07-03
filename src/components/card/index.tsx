import React from "react";
import { Card, Skeleton, Avatar } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
const { Meta } = Card;


const CardComponent = (props) => {
  const { data, loading, style } = props;

  return data.map((card) => (
    <Card
      style={{ width: '100%', marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={card.title}
          description={card.description}
        />
      </Skeleton>
    </Card>
  ));
};

export default CardComponent;
