import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

import Home from "./pages/index";
import Bookmark from "./pages/bookmark";

export default function App() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8">
        <div className="w-full lg:w-2xl">
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
          <div className="text-center border-t border-gray-300 pt-12 pb-4 text-gray-700 mt-12">
            <p>&copy; 2021 Ilham Wahabi. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Toaster />
    </Router>
  );
}
