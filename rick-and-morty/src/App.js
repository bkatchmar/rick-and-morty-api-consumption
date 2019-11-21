import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import Character from "./Character";
import Dashboard from "./Dashboard";
import IndividualCharacter from "./IndividualCharacter";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container fluid className="home-app">
        <h1>Welcome To The Rick and Morty React App</h1>
        <Nav pills>
          <NavItem>
            <NavLink href="#/characters">Characters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Episode Guide</NavLink>
          </NavItem>
        </Nav>
        <HashRouter>
          <Route exact={true} path="/" component={Dashboard}/>
          <Route exact={true} path="/characters" component={Character}/>
          <Route exact={true} path="/character/:id" component={IndividualCharacter}/>
        </HashRouter>
      </Container>
  )};
}

export default App;