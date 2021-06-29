import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import s from "./app.module.scss";
import { renderRoutes } from "./tools/route-tool";
import routes from "./routes";
import { Layout } from "./components/layout";
import { useModal, IUseModal } from "./components/modal";
import UserAuthModalView from "./views/modal-views/user-auth";
import { IComponentOfApp } from "./types/defined";
import { dispatcher } from "react-dispatch";
import { HANDLE_USER_SIGNUP, HANDLE_USER_LOGIN } from "./actions/constant";
import { dispatch } from "./actions";
import { useImmerReducer } from "use-immer";

const subscriptions = [HANDLE_USER_SIGNUP, HANDLE_USER_LOGIN];

const initialState = {
  userAuth: false,
};

function reducer(
  draft: { userAuth: any },
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case HANDLE_USER_SIGNUP:
      draft.userAuth = action.payload;
      return;

    case HANDLE_USER_LOGIN:
      draft.userAuth = action.payload;
      return;

    default:
      break;
  }
}

// start up -> contains user access manage
function App() {
  const modal = useModal();

  const [state, dispatchReducer] = useImmerReducer(reducer, initialState);

  console.log(`state`, state);

  useEffect(() => {
    subscriptions.forEach((type) => {
      dispatcher.on(type, (data: any) => {
        dispatchReducer({ type: type, payload: data });
      });
    });

    return () => {
      dispatcher.off(HANDLE_USER_SIGNUP);
    };
  }, []);

  const openAuthModal = () => {
    modal.setState((draft: any) => {
      draft.modal = {
        ...draft.modal,
        visible: true,
        content: (
          <UserAuthModalView
            userAuth={state.userAuth}
            updateState={modal.setState}
            onSubmit={handleUserAuthAction}
          />
        ),
        title: "开启你的创作旅程",
        type: 1,
        noFooter: true,
      };
    });
  };
  const handleUserAuthAction = (values: any, type: number) => {
    type === 0
      ? dispatch({ type: HANDLE_USER_LOGIN, payload: values }).then(() => {
          modal.setState((draft: { modal: { visible: boolean } }) => {
            draft.modal.visible = false;
          });
        })
      : dispatch({ type: HANDLE_USER_SIGNUP, payload: values }).then(() => {
          modal.setState((draft: { modal: { visible: boolean } }) => {
            draft.modal.visible = false;
          });
        });
  };

  const integrateProps: IComponentOfApp = {
    handleUserAuthAction,
    openAuthModal,
    ...state,
  };
  return (
    <Router>
      <Switch>
        <Layout {...integrateProps}>
          {renderRoutes(routes, integrateProps)}
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
