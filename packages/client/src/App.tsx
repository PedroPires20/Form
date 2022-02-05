import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Builder } from "./pages/Builder/Builder"
import { Viewer } from "./pages/Viewer/Viewer"
import { FormList } from "./pages/FormList/FormList";
import { Register } from "./pages/Register/Register"
import { useEffect } from "react"
import { useAppDispatch } from "./redux/store"
import { getAllForms } from "./redux/modules/forms/thunks"
import SideNav from "./shared/components/SideNav/SideNav";

export function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllForms())
  }, [])

  return (
    <BrowserRouter>
      <SideNav />
      <Switch>
        <Route exact path="/list" component={FormList}/>
        <Route exact path="/view" component={Viewer}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/edit" component={Builder} />
        <Route exact path="/" component={Builder} />
      </Switch>
    </BrowserRouter>
  )
}
