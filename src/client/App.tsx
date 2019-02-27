import * as React from "react";
import "./scss/app";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from "./components/List";
import EditingChirp from "./components/Editing";

class IApp extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <Router>
        <>
          <div className="container">
            <Switch>
              <Route exact path="/" component={List} />
              <Route exact path="/editing/:id" component={EditingChirp} />
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}

interface IAppProps {}
interface IAppState {}

export default IApp;
