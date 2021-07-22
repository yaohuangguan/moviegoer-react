import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { renderRoutes } from "./tools/route-tool";
import routes from "./routes";
import { Layout } from "./components/layout";
import { IComponentOfApp } from "./types/defined";
import { dispatcher } from "react-dispatch";
import { HANDLE_USER_SIGNUP, HANDLE_USER_LOGIN } from "./constants";
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


  const integrateProps: IComponentOfApp = {
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
