import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Container, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";
import "./Character.css"

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = { "CharacterRedirectId" : 0, "CurrentPage" : 1, "Pages" : [1], "Characters" : [] };
    }

    componentDidMount() {
        let that = this;
        axios.get(UrlEndPointGenerator.GetCharactersUrl()).then(resp => {
            that.setState({
                "CharacterRedirectId" : 0,
                "CurrentPage" : 1,
                "Pages" : that.processNewPaginationArray(resp.data.info.pages),
                "Characters" : resp.data.results
            });
        }).catch(error => {
            console.log(error);
        });
    }

    getNewPage(pg) {
        let that = this;
        axios.get(UrlEndPointGenerator.GetCharactersUrl(pg)).then(resp => {
            that.setState({
                "CharacterRedirectId" : 0,
                "CurrentPage" : pg,
                "Pages" : that.processNewPaginationArray(resp.data.info.pages),
                "Characters" : resp.data.results
            });
        }).catch(error => {
            console.log(error);
            that.setState({ "CharacterRedirectId" : 0, "CurrentPage" : 1, "Pages" : [1], "Characters" : [] });
        });
    }

    processNewPaginationArray(numPages) {
        let rtnVal = [];
        for (let i = 1; i <= numPages; i++) {
            rtnVal.push(i);
        }
        return rtnVal;
    }

    processRowClick(character) {
        this.setState({ "CharacterRedirectId" : character.id });
    }

    render() {
        if (this.state.CharacterRedirectId > 0) { return <Redirect to={"/character/" + this.state.CharacterRedirectId} /> }

        return (
            <Container>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Status</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Characters.map((value, index) => {
                            return(
                                <tr key={value.id} onClick={() => {this.processRowClick(value)}}>
                                    <td>{value.name}</td>
                                    <td>{value.species}</td>
                                    <td>{value.status}</td>
                                    <td>{value.gender}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Pagination>
                    {this.state.Pages.map((value, index) => {
                        return (
                            <PaginationItem key={index} active={this.state.CurrentPage === value}>
                                <PaginationLink onClick={() => this.getNewPage(value)}>{value}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                </Pagination>
            </Container>
        );
    }
}

export default Character;