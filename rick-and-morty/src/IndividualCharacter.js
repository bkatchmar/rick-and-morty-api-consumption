import React, { Component } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import axios from "axios";
import UrlEndPointGenerator from "./api_call/UrlEndPointGenerator";
import "./IndividualCharacter.css";

class IndividualCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = { "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "" };
    }

    componentDidMount() {
        let that = this;
        let charId = (that.props.match && that.props.match.params && that.props.match.params.id) ? that.props.match.params.id : 0;
        that.processCharacterRequest(charId).then(resp => that.setState(resp)).catch(error => that.setState(error));
    }

    processCharacterRequest(charId) {
        if (!charId) { charId = 0; }
        
        return new Promise((resolve, reject) => {
            if (charId === 0) {
                resolve({ "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "" });
            } else {
                axios.get(UrlEndPointGenerator.GetIndividualCharacterUrl(charId)).then(resp => {
                    resolve({
                        "ImageExists" : (resp.data.image && resp.data.image !== ""),
                        "ImageUrl" : resp.data.image,
                        "Name": resp.data.name,
                        "Gender" : resp.data.gender,
                        "Species" : resp.data.species
                    });
                }).catch(error => {
                    console.log(error);
                    reject({
                        "ImageExists" : false,
                        "ImageUrl" : "",
                        "Name": "",
                        "Gender" : "",
                        "Species" : ""
                    });
                });
            }
        });
    }

    render() {
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndividualCharacter;