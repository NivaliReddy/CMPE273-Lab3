import React,{Component} from 'react'
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import axios from 'axios';
import { reslogin } from '../../store/actions';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
const jwt_decode = require('jwt-decode');

class RestaurantLogin extends Component{

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
    await this.props.reslogin(data);
    console.log(this.props.restaurantLoginResponse);

    if (this.props.restaurantLoginResponse.status === 200) {
      var token = this.props.restaurantLoginResponse.data;
      localStorage.setItem("token", token);
      
      var decoded = jwt_decode(token.split(' ')[1]);
      const restaurantdata = JSON.parse(decoded.restaurant);
      console.log(restaurantdata)
      sessionStorage.setItem('id', restaurantdata._id)
      sessionStorage.setItem('isLoggedIn', true)
      sessionStorage.setItem('isRestaurant', true)
      this.setState({ redirect: <Redirect to="/" /> })
    }
    else {
      window.alert("Invalid credentials!");
    }

  }

    render=()=>{
        return (<div>
          {this.state.redirect}
            <Row>
                <Col md={6}>
                <Container style={{ width: "60%", marginTop: "250px" }}>

              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <Row>
                  <Col md={12} style={{ color: "red", fontSize: "30px" }}>
                    Bussiness Login to Yelp
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
            
            <Col md={6}>
                <div style={{position:"absolute",marginLeft:"50px",marginTop:"50px"} }>
                <img style={{height:"630px",width:"350px"}} src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/33e59e4f6b48/assets/img/biz_landing/landing_page_redesign/biz_cons_app_header_full_experiment_349@2x.png" alt="Girl in a jacket" width="500" height="600"/>
                </div>
            <Image src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/38a36963afad/assets/img/biz_landing/landing_page_redesign/bg_desktop@2x.jpg" fluid />
            </Col>
            </Row>
        </div>)
    }
}

const mapStateToProps = (state) => {
  return { restaurantDetails: state.restaurantDetails,
    restaurantLoginResponse: state.restaurantLoginResponse }
}

export default connect(mapStateToProps, { reslogin })(RestaurantLogin);