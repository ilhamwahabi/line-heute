import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/index";
import Bookmark from "./pages/bookmark";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bookmark">
          <Bookmark />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
