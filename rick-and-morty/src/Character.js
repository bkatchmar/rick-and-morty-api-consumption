import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink, Input } from "reactstrap";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";
import "./Character.css"

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = { "CharacterRedirectId" : 0, "NameSearch" : "", "CurrentPage" : 1, "Pages" : [1], "Characters" : [] };
    }

    componentDidMount() {
        let that = this;
        that.processCharacterPageRequest().then(resp => { that.setState(resp); }).catch(error => { that.setState(error); });
    }

    getNewPage(pg) {
        let that = this;
        that.processCharacterPageRequest(pg).then(resp => { that.setState(resp); }).catch(error => { that.setState(error); });
    }

    processCharacterPageRequest(pageNum) {
        let that = this;
        if (!pageNum) { pageNum = 1; }
        
        return new Promise((resolve, reject) => {
            axios.get(UrlEndPointGenerator.GetCharactersUrl(pageNum)).then(resp => {
                resolve({
                    "CharacterRedirectId" : 0,
                    "NameSearch" : "",
                    "CurrentPage" : pageNum,
                    "Pages" : that.processNewPaginationArray(resp.data.info.pages),
                    "Characters" : resp.data.results
                });
            }).catch(error => {
                console.log(error);
                reject({
                    "CharacterRedirectId" : 0,
                    "NameSearch" : "",
                    "CurrentPage" : 1,
                    "Pages" : [1],
                    "Characters" : []
                });
            });
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
                <Row className="name-search">
                    <Col md="11">
                        <Input type="text" name="name-search" id="name-search" placeholder="Search By Name" />
                    </Col>
                    <Col md="1"><Button color="primary">Search</Button></Col>
                </Row>
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