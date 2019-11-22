import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import queryString from "query-string";

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { "CharactersLink" : "#/characters", "EpisodesLink" : "#" };
    }

    componentDidMount() {
        this.updateLinksBasedOnQueryString(this.processQueryString());
        this.unlisten = this.props.history.listen((location, action) => {
            this.updateLinksBasedOnQueryString(this.processQueryString(location));
        });
    }
    componentWillUnmount() { this.unlisten(); }

    // TODO: Write an extension of Component and have all front end classes use this new extension, include this method
    processQueryString(location) {
        let rtnVal = {};

        if (location) {
            rtnVal = (location && location.search) ? queryString.parse(location.search) : {};
        } else {
            rtnVal = (this.props && this.props.location && this.props.location.search) ? queryString.parse(this.props.location.search) : {};
        }

        return rtnVal;
    }

    updateLinksBasedOnQueryString(qsValues) {
        let charUrl = "#/characters";
        let extraCharUrl = "";
        if (qsValues.fromPage && qsValues.nameSearch) {
            extraCharUrl = `/?fromPage=${qsValues.fromPage}&nameSearch=${qsValues.nameSearch}`;
        } else if (qsValues.fromPage) {
            extraCharUrl = `/?fromPage=${qsValues.fromPage}`;
        } else if (qsValues.nameSearch) {
            extraCharUrl = `/?nameSearch=${qsValues.nameSearch}`;
        }
        this.setState({ "CharactersLink" : (charUrl + extraCharUrl), "EpisodesLink" : "#" });
    }
    
    render() {
        return (
            <Container fluid className="home-app">
                <h1>Welcome To The Rick and Morty React App</h1>
                <Nav pills>
                    <NavItem>
                        <NavLink href={this.state.CharactersLink}>Characters</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href={this.state.EpisodesLink}>Episode Guide</NavLink>
                    </NavItem>
                </Nav>
                <div>{this.props.children}</div>
            </Container>
        );
    }
}

export default withRouter(AppContainer);