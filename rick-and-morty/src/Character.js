import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Table, Pagination, PaginationItem, PaginationLink, Input } from "reactstrap";
import queryString from "query-string";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";
import "./Character.css"

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = { "CharacterRedirectId" : 0, "NameSearch" : "", "CurrentPage" : 1, "Pages" : [1], "Characters" : [] };
    }

    componentDidMount() {
        let qsValues = this.processQueryString();
        let selectedPage = (qsValues.fromPage) ? parseInt(qsValues.fromPage) : 1;
        this.getNewPage(selectedPage,true);
    }

    getNewPage(pg,includeQueryString) {
        let that = this;
        that.processCharacterPageRequest(pg,includeQueryString).then(resp => { that.setState(resp); }).catch(error => { that.setState(error); });
    }

    processCharacterPageRequest(pageNum,includeNameQueryString) {
        let that = this;
        let currentNameSearch = this.state.NameSearch;
        if (!pageNum) { pageNum = 1; }
        if (includeNameQueryString && currentNameSearch === "") {
            let qsValues = this.processQueryString();
            currentNameSearch = (qsValues.nameSearch) ? qsValues.nameSearch : "";
        }
        
        return new Promise((resolve, reject) => {
            axios.get(UrlEndPointGenerator.GetCharactersUrl(pageNum,currentNameSearch)).then(resp => {
                resolve({
                    "CharacterRedirectId" : 0,
                    "NameSearch" : currentNameSearch,
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

    processQueryString() {
        let rtnVal = {};
        rtnVal = (this.props && this.props.location && this.props.location.search) ? queryString.parse(this.props.location.search) : {};
        return rtnVal;
    }

    render() {
        if (this.state.CharacterRedirectId > 0) { return <Redirect to={"/character/" + this.state.CharacterRedirectId + "?fromPage=" + this.state.CurrentPage + (this.state.NameSearch === "" ? "" : "&nameSearch=" + this.state.NameSearch)} /> }

        return (
            <Container>
                <Row className="name-search">
                    <Col md="11">
                        <Input type="text"
                            name="name-search"
                            id="name-search"
                            placeholder="Search By Name"
                            value={this.state.NameSearch}
                            onChange={(event) => this.setState({ NameSearch : event.target.value })} />
                    </Col>
                    <Col md="1"><Button color="primary" onClick={() => this.getNewPage(1,false)}>Search</Button></Col>
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
                                <PaginationLink onClick={() => this.getNewPage(value,false)}>{value}</PaginationLink>
                            </PaginationItem>
                        )
                    })}
                </Pagination>
            </Container>
        );
    }
}

export default Character;