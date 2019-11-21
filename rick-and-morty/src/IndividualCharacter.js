import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import axios from "axios";
import queryString from "query-string";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";
import "./IndividualCharacter.css";

class IndividualCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = { "BackToList" : false, "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "", "FromPage" : 1 };
    }

    componentDidMount() {
        let that = this;
        let charId = (that.props.match && that.props.match.params && that.props.match.params.id) ? that.props.match.params.id : 0;
        that.processCharacterRequest(charId).then(resp => that.setState(resp)).catch(error => that.setState(error));
    }

    processCharacterRequest(charId) {
        if (!charId) { charId = 0; }
        let qsValues = queryString.parse(this.props.location.search);
        
        return new Promise((resolve, reject) => {
            if (charId === 0) {
                resolve({ "BackToList" : false, "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "", "FromPage" : 1 });
            } else {
                axios.get(UrlEndPointGenerator.GetIndividualCharacterUrl(charId)).then(resp => {
                    resolve({
                        "BackToList" : false,
                        "ImageExists" : (resp.data.image && resp.data.image !== ""),
                        "ImageUrl" : resp.data.image,
                        "Name": resp.data.name,
                        "Gender" : resp.data.gender,
                        "Species" : resp.data.species,
                        "FromPage" : (qsValues.fromPage) ? qsValues.fromPage : 1
                    });
                }).catch(error => {
                    console.log(error);
                    reject({
                        "BackToList" : false,
                        "ImageExists" : false,
                        "ImageUrl" : "",
                        "Name": "",
                        "Gender" : "",
                        "Species" : "",
                        "FromPage" : 1
                    });
                });
            }
        });
    }

    render() {
        if (this.state.BackToList) { return <Redirect to={"/characters/?fromPage=" + this.state.FromPage} /> }
        
        return (
            <Container className="text-center individual-character">
                <Row>
                    <Col lg="12">
                        <Card>
                            {this.state.ImageExists &&
                                <CardImg top src={this.state.ImageUrl} alt={this.state.Name} id="character-portrait" />
                            }
                            <CardBody>
                                <CardTitle>{this.state.Name}</CardTitle>
                                <CardSubtitle>{this.state.Gender}{' '}{this.state.Species}</CardSubtitle>
                                <Button color="primary" onClick={() => this.setState({"BackToList" : true})}>Back</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndividualCharacter;