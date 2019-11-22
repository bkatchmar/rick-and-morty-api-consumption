import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import AppContainer from "./AppContainer";
import Character from "./Character";
import Dashboard from "./Dashboard";
import IndividualCharacter from "./IndividualCharacter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <AppContainer>
          <Route exact={true} path="/" component={Dashboard}/>
          <Route exact={true} path="/characters" component={Character}/>
          <Route exact={true} path="/character/:id" component={IndividualCharacter}/>
        </AppContainer>
      </HashRouter>
  )};
}

export default App;