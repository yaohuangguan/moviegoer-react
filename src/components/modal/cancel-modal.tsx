// tslint:disable
import React, { useState, ChangeEvent, useEffect, Fragment } from "react";
import { Modal, Input } from "antd";

import s from "./style.module.scss";
export interface IProps {
  title: string | JSX.Element;
  confirmTargetName?: string;
  describe: string | JSX.Element | React.ReactNode;
  visible: boolean;
  onClose: () => void;
  onOk: (e?: any) => void;
  webUrl?: string;
  is2StepConfirm?:
    | {
        targetConfirmName: string;
        targetTypeName: string;
        enabled: true;
      }
    | any;
  loading: boolean;
  width?: number;
  okText?: string;
  disabled?: boolean;
  cancelText?: string;
  okButtonProps?: {
    loading?: boolean;
    disabled?: boolean;
    danger?: boolean;
    style?: any;
  };
  cancelButtonProps?: { disabled?: boolean; style?: any };
  buttonDangerType?: boolean;
}

const CancelModal = React.memo((props: IProps) => {
  const {
    visible,
    title,
    describe,
    onClose,
    onOk,
    is2StepConfirm = { enabled: false },
    loading,
    width,
    okText = "确认",
    cancelText = "取消",
    disabled = false,
    cancelButtonProps,
    okButtonProps,
    buttonDangerType = true,
  } = props;

  const { targetTypeName, targetConfirmName } = is2StepConfirm;

  const [errorMsg, setErrorMsg] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(e.target.value);
  };

  const handleOk = () => {
    if (!is2StepConfirm.enabled) return onOk();

    if (!confirmValue) {
      setErrorMsg(`请输入${targetTypeName}名称`);
    } else if (confirmValue !== targetConfirmName) {
      setErrorMsg(`所输入的名称与当前${title}名称不一致，请重新输入`);
    } else if (confirmValue === targetConfirmName) {
      setErrorMsg("");
      onOk();
    }
  };

  useEffect(() => {
    setErrorMsg("");
    setConfirmValue("");
  }, [visible]);
  const conditionallyRender = () => {
    if (!is2StepConfirm.enabled) return;
    return (
      <Fragment>
        <div className={s.cancelModalSubText}>
          请输入{title}名称{" "}
          <a
            style={{
              fontWeight: "bold",
              color: "#202d40",
              background: "rgb(235,237,241)",
              padding: "0px 4px 0px 4px",
            }}
          >
            {targetConfirmName}
          </a>{" "}
          以确认{title}
        </div>
        <Input
          value={confirmValue}
          onChange={handleChange}
          className={!errorMsg ? s.cancelConfirmInput : s.errorInputDiv}
          placeholder={`请输入${title}名称`}
          // onBlur={onBlur}
          autoFocus
        />
      </Fragment>
    );
  };
  const okButton = {
    ...okButtonProps,
    danger: buttonDangerType,
    disabled: disabled,
  };
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      title={title}
      width={width}
      okText={okText}
      okButtonProps={okButton}
      cancelButtonProps={cancelButtonProps}
      confirmLoading={loading}
      cancelText={cancelText}
      destroyOnClose
    >
      {describe}
      {conditionallyRender()}
      {errorMsg && <div className={s.errorMsg}>{errorMsg}</div>}
    </Modal>
  );
});

export default CancelModal;
