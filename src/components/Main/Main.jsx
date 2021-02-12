import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ROUTE from "routes";
import Dashboard from "components/Dashboard/Dashboard";

const Main = () => (
  <div className="mainWrapper">
    <div className="switchWrapper">
      <Switch>
        <Redirect exact from={ROUTE.ROOT} to={ROUTE.SECTIONS.DASHBOARD} />
        <Route
          component={Dashboard}
          exact
          key="dashboard"
          path={ROUTE.SECTIONS.DASHBOARD}
        />
      </Switch>
    </div>
  </div>
);

export default Main;
