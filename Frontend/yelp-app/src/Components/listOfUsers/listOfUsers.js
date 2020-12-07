import React from 'react';
import { Form, Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import UserCard from './userCard';

const users = (props) => {
    let users = props.users;

    console.log(users);
    return (
        <div>
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col md="3">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Search"
                                //onChange={this.changedSearchtext}
                                />
                            </Form.Group>
                            <Container>
                                <Button variant="danger" style={{ width: "100%" }}>
                                    Search
                                </Button>
                            </Container>
                        </Form>
                    </Col>
                    <Col md="8">
                        <Row style={{ textAlign: "center" }}>
                            <Col>
                            <h5>List of Users</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Container>
                                <UserCard />
                            </Container>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <h5>Filters</h5>
                        <br />
                        <Row>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        type="checkbox"
                                        //onChange={this.filterNewOrders}
                                        label="Following"
                                    />
                                </Form.Group>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default users;