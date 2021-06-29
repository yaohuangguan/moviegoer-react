import React, { useRef, useLayoutEffect } from "react";
import { Popover, Button } from "antd";
import s from "./style.module.scss";
import cn from "classnames";
import { TooltipPlacement } from "antd/lib/tooltip";
interface IPopConfirmProps {
  children: any;
  visible: boolean;
  popover: any;
  placement?: TooltipPlacement | undefined;
  title: any;
  onOk: (e?: any) => void;
  onCancel: (e?: any) => void;
  confirmBtnType?:
    | "primary"
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "dashed"
    | undefined;
  getContainer?: any;
  className?: string;
}
const PopConfirm = (props: IPopConfirmProps) => {
  const {
    children,
    visible,
    popover,
    placement = "bottom",
    title,
    onOk,
    onCancel,
    confirmBtnType = "primary",
    getContainer,
    className = "",
  } = props;
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!visible && ref) {
      ref.current = null;
    }
  }, [visible]);
  const renderPopover = () => (
    <div className={s.popOverContent}>
      {popover}

      <div className={s.popButton}>
        <Button type={confirmBtnType} onClick={onOk}>
          确认
        </Button>
        <Button style={{ marginLeft: "15px" }} onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
  return (
    <div className={cn(className, s.popConfirm)} ref={ref}>
      <Popover
        title={<span className={s.popTitle}>{title}</span>}
        destroyTooltipOnHide={{ keepParent: false }}
        content={renderPopover()}
        placement={placement}
        visible={visible}
        getPopupContainer={(triggerNode: any) =>
          getContainer || triggerNode
            ? triggerNode.parentElement
            : document.body
        }
      >
        {children}
      </Popover>
    </div>
  );
};

export default PopConfirm;
