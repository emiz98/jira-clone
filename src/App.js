import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IssueDetails from "./Pages/IssueDetails";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/issue/:id/">
          <IssueDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
