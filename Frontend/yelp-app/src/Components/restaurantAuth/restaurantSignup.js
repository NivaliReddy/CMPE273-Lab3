import React, { Component } from 'react'
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import { Redirect } from "react-router";
import { ressignup } from '../../store/actions/index';
import { connect } from 'react-redux';
const jwt_decode = require('jwt-decode');

class RestaurantSignup extends Component {
    state = {
       restaurantName:"",
        emailId: "",
        password: "",
        zipCode: ""
    }

    restaurantName = (e) => {
      this.setState({ restaurantName: e.target.value })
  }
    onChangeEmail = (e) => {
        this.setState({ emailId: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    onChangeLocation = (e) => {
        this.setState({ location: e.target.value })
    }

    onSignup = async (e) => {
        let data = {
            restaurantName:this.state.restaurantName,
            emailId: this.state.emailId,
            password: this.state.password,
            location: this.state.location
        }

    //API Call here


        await this.props.ressignup(data);
        console.log(this.props.restaurantSignupResponse);
        if(this.props.restaurantSignupResponse.status ===200){
          var token = this.props.restaurantSignupResponse.data;
          localStorage.setItem("token", token);
          
          var decoded = jwt_decode(token.split(' ')[1]);
          const restaurantdata = JSON.parse(decoded.restaurant);
          console.log(restaurantdata)
            sessionStorage.setItem('id',restaurantdata._id)
            sessionStorage.setItem('isLoggedIn',true)
            this.setState({redirect: <Redirect to="/" />})
        }
        else{
            window.alert("User already exists!");
        }
    }

  render = () => {
    return (<div>
      {this.state.redirect}
      <Row>
        <Col md={6}>
          <Container style={{ width: "60%", marginTop: "200px" }}>

            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <Row>
                <Col md={12} style={{ color: "red", fontSize: "30px" }}>
                  Business Sign Up for Yelp 
        </Col>
              </Row>
            </div>

            <Form>
              <Row>
                <Col md={12} >

                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control onChange={this.restaurantName} type="text" placeholder="Restaurant Name" />
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
                    <Form.Control onChange={this.onChangeLocation} type="text" placeholder="Location" />
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
        <Col md={6}>
          <div style={{ position: "absolute", marginLeft: "50px", marginTop: "50px" }}>
            <img style={{ height: "630px", width: "350px" }} src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/33e59e4f6b48/assets/img/biz_landing/landing_page_redesign/biz_cons_app_header_full_experiment_349@2x.png" alt="Girl in a jacket" width="500" height="600" />
          </div>
          <Image src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/38a36963afad/assets/img/biz_landing/landing_page_redesign/bg_desktop@2x.jpg" fluid />
        </Col>
      </Row>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return { restaurantDetails : state.restaurantDetails,
    restaurantSignupResponse: state.restaurantSignupResponse }
}

export default connect(mapStateToProps, { ressignup })(RestaurantSignup);