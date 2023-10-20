import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Sorthome from "./components/sorting/sorthome";
import Pathhome from "./components/pathfinder/pathhome";
import { useEffect } from "react";

const App = () => {
  return (
    <div className="App">
      <div className="main">
        <Router>
          <Switch>
            <Route exact path="/">
              <Sorthome />
            </Route>
            <Route exact path="/sorting">
              <Sorthome />
            </Route>
            <Route exact path="/pathfinder">
              <Pathhome />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
