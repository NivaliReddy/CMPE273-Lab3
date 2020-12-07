import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import axios from 'axios';
import { login } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

const jwt_decode = require('jwt-decode');

class Login extends Component {
  state = {
    emailId: "",
    password: "",
    redirect: null
  }

  onChangeEmail = (e) => {
    this.setState({ emailId: e.target.value })
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  onLogin = async (e) => {
    let data = {
      emailId: this.state.emailId,
      password: this.state.password
    }
    await this.props.login(data);
    //console.log(this.props.loginResponse.data);
    if (this.props.loginResponse.status === 200) {
      var token = this.props.loginResponse.data;
      localStorage.setItem("token", token);
      
      var decoded = jwt_decode(token.split(' ')[1]);
      const userdata = JSON.parse(decoded.user);
      console.log(userdata)
      sessionStorage.setItem('id', userdata._id)
      sessionStorage.setItem('isLoggedIn', true)
      this.setState({ redirect: <Redirect to="/" /> })
    }
    else {
      window.alert("Invalid credentials!");
    }

  }


  render = () => {
    return <div>
      {this.state.redirect}
      <Container>
        <Row>
          <Col md={6} >

            <Container style={{ width: "60%", marginTop: "120px" }}>

              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <Row>
                  <Col md={12} style={{ color: "red", fontSize: "30px" }}>
                    Log in to Yelp
          </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <b>New to Yelp? </b> Sign up
                  </Col>
                  <Col style={{ fontSize: "10px" }}>
                    By logging in, you agree to Yelp's Terms of Service and Privacy Policy
                  </Col>
                </Row>
              </div>

              <Form>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="email" placeholder="email" required onChange={this.onChangeEmail} />
                    </Form.Group>
                  </Col>

                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="exampleForm.ControlInput2">
                      <Form.Control type="password" placeholder="password" required onChange={this.onChangePassword} />
                    </Form.Group>
                  </Col>

                </Row>
                <Row>
                  <Col md={12}>
                    <Button variant="danger" block onClick={this.onLogin}>Login</Button>
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
  loginResponse: state.loginResponse }
}

export default connect(mapStateToProps, { login })(Login);