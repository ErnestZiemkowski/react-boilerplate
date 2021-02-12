import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "store";
import { PrivateRoute } from "routes/PrivateRoute";
import ROUTE from "routes";

import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import Main from "components/Main/Main.jsx";

const App = () => (
  <div className="app">
    <ConnectedRouter history={history}>
      <Switch>
        <Route component={Register} exact path={ROUTE.REGISTER} />
        <Route component={Login} exact path={ROUTE.LOGIN.HOME} />
        <PrivateRoute component={Main} path={ROUTE.ROOT} />
      </Switch>
    </ConnectedRouter>
  </div>
);

export default App;
