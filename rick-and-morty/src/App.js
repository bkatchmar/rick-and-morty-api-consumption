import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  return (
    <Container fluid className="home-app">
      <h1>Welcome To The Rick and Morty React App</h1>
      <Nav pills>
        <NavItem>
          <NavLink href="#">Characters</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Episode Guide</NavLink>
        </NavItem>
      </Nav>
      <HashRouter>
        <Route exact={true} path="/" component={Dashboard}/>
      </HashRouter>
    </Container>
  );
}

export default App;