import React from "react";
import { Modal } from "antd";

export interface IProps {
  title: string | JSX.Element;
  describe: string | JSX.Element | React.ReactNode;
  visible: boolean;
  onClose: () => void;
  onOk: (e?: any) => void;
  width?: number | string;
  noFooter?: boolean;
  okButtonProps?: {
    loading?: boolean;
    disabled?: boolean;
    danger?: boolean;
    style?: any;
  };
  cancelButtonProps?: { disabled?: boolean; style?: any };
  loading: boolean;
  okText?: string;
  cancelText?: string;
  closeIcon?: JSX.Element;
  style?: React.CSSProperties;
  centered?: boolean;
  bodyStyle?: React.CSSProperties;
  disabled?: boolean;
  getContainer?: HTMLElement | (() => HTMLElement) | false | string;
}

const createModal = React.memo((props: IProps) => {
  const {
    visible,
    title,
    describe,
    onClose,
    style = {},
    onOk,
    width,
    noFooter = false,
    okButtonProps,
    cancelButtonProps,
    loading,
    okText = "确认",
    cancelText = "取消",
    closeIcon,
    centered = false,
    bodyStyle = {},
    disabled = false,
    getContainer = document.body,
  } = props;

  const okButton = {
    ...okButtonProps,
    disabled,
  };
  const cancelButton = {
    ...cancelButtonProps,
  };
  return noFooter ? (
    <Modal
      width={width}
      visible={visible}
      onCancel={onClose}
      onOk={onOk}
      title={title}
      okButtonProps={okButton}
      cancelButtonProps={cancelButton}
      confirmLoading={loading}
      okText={okText}
      cancelText={cancelText}
      footer={null}
      closeIcon={closeIcon}
      style={style}
      centered={centered}
      bodyStyle={bodyStyle}
      getContainer={getContainer === "current_dom" ? false : getContainer}
      destroyOnClose
    >
      {describe}
    </Modal>
  ) : (
    <Modal
      width={width}
      visible={visible}
      style={style}
      onCancel={onClose}
      onOk={onOk}
      title={title}
      okButtonProps={okButton}
      cancelButtonProps={cancelButton}
      confirmLoading={loading}
      okText={okText}
      cancelText={cancelText}
      closeIcon={closeIcon}
      centered={centered}
      bodyStyle={bodyStyle}
      getContainer={getContainer === "current_dom" ? false : getContainer}
      destroyOnClose
    >
      {describe}
    </Modal>
  );
});

export default createModal;
