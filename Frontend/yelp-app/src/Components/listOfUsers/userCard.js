import React from 'react'
import { Form, Container, Row, Col, Button, Image, ListGroup, Card, CardGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';

const user = (props) => {


    return (
        <div>
            <Container fluid style={{ marginTop: "20px", marginBottom: "20px" }}>
                <CardGroup className="d-block">
                    <Card>
                        <Row>
                            <Col>
                                <Card.Body md={8}>
                                    <Container fluid>
                                        <Row>
                                            <Col md={8}>
                                                <Link style={{ color: "black" }}><h4> User Name </h4></Link>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={4}>
                                                City, State
                                            </Col>
                                            <Col md={4}>
                                                Phone Number
                                            </Col>
                                            <Col md={4}>
                                                Email Address
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </CardGroup>
            </Container>
        </div>
    )
}

export default user;