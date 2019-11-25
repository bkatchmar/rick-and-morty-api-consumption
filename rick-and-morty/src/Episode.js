import React, { Component } from "react";
import axios from "axios";
import { Container, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";

class Episode extends Component {
    constructor(props) {
        super(props);
        this.state = { "CurrentPage" : 1, "Pages" : [1], "Episodes" : [] };
    }

    componentDidMount() {
        this.getNewPage();
    }

    getNewPage(pg) {
        let that = this;
        that.processEpisodePageRequest(pg).then(resp => { that.setState(resp); }).catch(error => { that.setState(error); });
    }

    processEpisodePageRequest(pageNum) {
        let that = this;
        if (!pageNum) { pageNum = 1; }
        
        return new Promise((resolve, reject) => {
            axios.get(UrlEndPointGenerator.GetEpisodesUrl(pageNum)).then(resp => {
                resolve({
                    "CurrentPage" : pageNum,
                    "Pages" : that.processNewPaginationArray(resp.data.info.pages),
                    "Episodes" : resp.data.results
                });
            }).catch(error => {
                console.log(error);
                reject({
                    "CurrentPage" : 1,
                    "Pages" : [1],
                    "Episodes" : []
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

    render() {
        return (
            <Container>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Episode</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.Episodes.map((value, index) => {
                        return(
                            <tr key={value.id}>
                                <td>{value.name}</td>
                                <td>{value.episode}</td>
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

export default Episode;