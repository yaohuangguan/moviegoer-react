import React, { useState, useLayoutEffect } from "react";
import CreateModal from "./create-modal";
import CancelModal from "./cancel-modal";
import ReactDOM from "react-dom";
import { useImmer } from "use-immer";
export interface IUseModal {
  modal: {
    onOk: (e?: any) => any;
    onClose: (e?: any) => any;
    title: string;
    okText?: string;
    cancelText?: string;
    style?: any;
    visible: boolean;
    content: JSX.Element | React.ReactNode;
    type: 1 | 2;
    noFooter?: boolean;
  };
}

interface useModalReturnObj<T = any> {
  state?: any;
  setState: (e?: any) => any;
  //   CreateInstance: JSX.Element | React.ReactNode;
  //   CancelInstance: JSX.Element | React.ReactNode;
}

export const useModal = (): useModalReturnObj => {
  const [state, setState] = useImmer<IUseModal>({
    modal: {
      visible: false,
      title: "",
      content: <span />,
      onOk() {},
      onClose() {},
      type: 1,
    },
  });
  const [loading, setLoading] = useState(false);

  const onConfirm = state.modal.onOk;

  console.log("onConfirm :>> ", onConfirm);
  const integrateModalProp = {
    ...state.modal,
    onOk() {
      console.log("onConfirm :>> ", onConfirm);
      setLoading(true);
      onConfirm().finally(() => setLoading(false));
    },
    onClose() {
      setState((draft) => {
        draft.modal.visible = false;
      });
      setLoading(false);
    },
    loading,
    visible: state.modal.visible,
    describe: state.modal.content,
  };

  const [portalNode] = useState(document.createElement("div"));

  console.log("modalState :>> ", state);

  useLayoutEffect(() => {
    return () => {
      ReactDOM.unmountComponentAtNode(portalNode);
    };
  }, []);

  useLayoutEffect(() => {
    ReactDOM.render(
      ReactDOM.createPortal(
        state.modal.type === 1 ? (
          <CreateModal {...integrateModalProp} />
        ) : (
          <CancelModal {...integrateModalProp} />
        ),
        portalNode
      ),
      portalNode
    );
  }, [state.modal.visible, state.modal.type]);

  //   const CreateInstance = useCallback(
  //     (props: IUseModal) => <CreateModal {...props} />,
  //     []
  //   );

  //   const CancelInstance = useCallback(
  //     (props: IUseModal) => <CancelModal {...props} />,
  //     []
  //   );

  return {
    // CreateInstance,
    // CancelInstance,
    state,
    setState,
  };
};
