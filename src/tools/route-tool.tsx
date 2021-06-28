import React, { useState, useLayoutEffect } from "react";
import { Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import s from "./style.module.scss";

export function PortalDOMHooks(props: { maskId: any; children: any }) {
  const { maskId, children } = props;
  const [portalNode] = useState(document.createElement("div"));

  useLayoutEffect(() => {
    portalNode.setAttribute("id", maskId);
    portalNode.className = s.page;
    document.body.appendChild(portalNode);
    return () => {
      ReactDOM.unmountComponentAtNode(portalNode);
      document.body.removeChild(portalNode);
    };
  }, []);

  useLayoutEffect(() => {
    ReactDOM.render(ReactDOM.createPortal(children, portalNode), portalNode);
  }, [props]);
  return null;
  
}

export function renderRoutes(routes: any, superProps: any) {
  return routes.map((item: any, index: number) => {
    return [
      <Route
        key={item.path}
        path={item.path}
        exact={!!item.exact}
        component={(props: any) => {
          return (
            <CSSTransition
              unmountOnExit
              in={!!props.match}
              classNames={item.effect}
              timeout={item.timeout}
            >
              <item.component
                key={index}
                {...superProps}
                {...props}
                translucent={item.translucent}
              />
            </CSSTransition>
          );
        }}
      />,
      ...renderRoutes(item.routes || [], superProps),
    ];
  });
}
