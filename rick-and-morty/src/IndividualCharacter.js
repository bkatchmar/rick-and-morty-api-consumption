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
        if (this.props.match.params.id) {
            axios.get(UrlEndPointGenerator.GetIndividualCharacterUrl(this.props.match.params.id)).then(resp => {
                this.setState({
                    "ImageExists" : (resp.data.image && resp.data.image !== ""),
                    "ImageUrl" : resp.data.image,
                    "Name": resp.data.name,
                    "Gender" : resp.data.gender,
                    "Species" : resp.data.species
                });
            }).catch(error => {
                console.log(error);
                this.setState({ "ImageExists" : false, "ImageUrl" : "", "Name": "", "Gender" : "", "Species" : "" });
            });
        }
    }

    render() {
        return (
            <Container className="text-center individual-character">
                <Row>
                    <Col lg="12">
                        <Card>
                            {this.state.ImageExists &&
                                <CardImg top src={this.state.ImageUrl} alt={this.state.Name} />
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