import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Builder } from "./pages/Builder/Builder"
import { Viewer } from "./pages/Viewer/Viewer"
import { Register } from "./pages/Register/Register";
import { FormList } from "./pages/FormList/FormList";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/list" component={FormList}/>
        <Route exact path="/view" component={Viewer}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={Builder} />
      </Switch>
    </BrowserRouter>
  )
}
