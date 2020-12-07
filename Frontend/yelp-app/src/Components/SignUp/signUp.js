import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import { signup } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
const jwt_decode = require('jwt-decode');

class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        zipCode: ""
    }

    onChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value })
    }

    onChangeLastName = (e) => {
        this.setState({ lastName: e.target.value })
    }
    onChangeEmail = (e) => {
        this.setState({ emailId: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    onChangeZipCode = (e) => {
        this.setState({ zipCode: e.target.value })
    }

    onSignup = async (e) => {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            password: this.state.password,
            zipCode: this.state.zipCode
        }
        await this.props.signup(data);
        console.log(this.props.userSignupDetails);
        if(this.props.userSignupDetails.status ===200){
            var token = this.props.userSignupDetails.data;
            localStorage.setItem("token", token);
      
            var decoded = jwt_decode(token.split(' ')[1]);
            const userdata = JSON.parse(decoded.user);
            console.log(userdata)
            sessionStorage.setItem('id',userdata._id)
            sessionStorage.setItem('isLoggedIn',true)
            this.setState({redirect: <Redirect to="/" />})
        }
        else{
            window.alert("User already exists!");
        }
    }

    render = () => {
        return <div>
            {this.state.redirect}
            <Container>
                <Row>
                    <Col md={6} >

                        <Container style={{ width: "60%", marginTop: "200px" }}>

                            <div style={{ textAlign: "center", marginBottom: "50px" }}>
                                <Row>
                                    <Col md={12} style={{ color: "red", fontSize: "30px" }}>
                                        Sign Up for Yelp
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <b>Connect with great local businesses</b>
                                    </Col>
                                </Row>
                            </div>

                            <Form>
                                <Row style={{ marginBottom: "10px" }}>
                                    <Col md={6} >

                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control onChange={this.onChangeFirstName} style={{ width: "110%", float: "left" }} type="text" placeholder="First Name" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>

                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control onChange={this.onChangeLastName} style={{ width: "110%", float: "right" }} type="text" placeholder="Last Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control onChange={this.onChangeEmail} type="email" placeholder="email" />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control onChange={this.onChangePassword} type="password" placeholder="password" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control onChange={this.onChangeZipCode} type="text" placeholder="ZIP Code" />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Button onClick={this.onSignup} variant="danger" block>Sign Up</Button>
                                    </Col>
                                </Row>

                            </Form>
                        </Container>
                    </Col>

                    <Col md={6} style={{ marginTop: "70px" }}>
                        <Image src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" roundedCircle />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

const mapStateToProps = (state) => {
    return { userDetails: state.userDetails,
        userSignupDetails: state.userSignupDetails }
}

export default connect(mapStateToProps, { signup })(Signup);