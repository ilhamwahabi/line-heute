import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/index";
import Bookmark from "./pages/bookmark";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8">
        <div className="w-full lg:w-3xl">
          <Link to="/">
            <h1 className="text-gray-700 font-medium text-3xl">LINE Heute</h1>
          </Link>
          <Switch>
            <Route path="/bookmark">
              <Bookmark />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
