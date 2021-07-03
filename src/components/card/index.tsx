import React from "react";
import { Card, Skeleton, Avatar } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

interface ICard {
  data: any[];
  loading: boolean;
}

const CardComponent = (props: ICard) => {
  const { data, loading } = props;

  return (
    <>
      {data.map((card) => (
        <Card
          key={card.description}
          style={{ width: "100%", marginTop: 16 }}
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
      ))}
    </>
  );
};

export default CardComponent;
