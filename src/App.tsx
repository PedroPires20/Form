import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Builder} from "./pages/Builder/Builder";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Builder} />
      </Switch>
    </BrowserRouter>
  );
}
