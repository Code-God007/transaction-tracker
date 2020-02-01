import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import BalanceSheet from "./components/BalanceSheet";
import AddNewTxn from "./components/AddNewTxn";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={BalanceSheet} />
          <Route exact path="/add" component={AddNewTxn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
