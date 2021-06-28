import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import s from "./app.module.scss";
import { renderRoutes } from "./tools/route-tool";
import routes from "./routes";
import { Layout } from "./components/layout";

// start up
function App(props: any) {

  return (
    <Router>
      <Layout {...props}>{renderRoutes(routes, props)}</Layout>
    </Router>
  );
}

export default App;
