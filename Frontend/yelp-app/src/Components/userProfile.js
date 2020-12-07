import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Image, ListGroup,Badge } from "react-bootstrap";
import { profileFetch } from '../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { BsPencil, BsStarFill, BsImage } from "react-icons/bs";

import Review from './Reviews/reviews'
import Event from './event/eventList'

import { Link } from 'react-router-dom';




class Profile extends Component {
    state = {
        redirect: null,
        reviews: [],
        selectedTab:"reviews",
        thingsILove:"",
        favorites:""
    }

    onProfile = async (e) => {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            nickName: this.state.nickName,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipCode: this.state.zipCode,
            phoneNumber: this.state.phoneNumber
        }
        await this.props.profile(data, this.state._id);
        console.log(this.props.userDetails);
        if (this.props.userDetails.status === 200) {
            sessionStorage.setItem('id', this.props.userDetails.data.id)
            sessionStorage.setItem('isLoggedIn', true)
            this.setState({ redirect: <Redirect to="/profile" /> })
        }
        else {

        }
    }

    changeTab = (selectedTab) => {
        this.setState({ selectedTab: selectedTab })

    }

    componentDidMount = async () => {
        const _id = this.props.match.params._id;
        await this.props.profileFetch(_id)
        this.setState({ ...this.props.userProfile.data })
    }

    render = () => {
        console.log(this.props.userDetails)
        return <div>
            {this.state.redirect}

            {/* <Container style={{ width: "80%" }}> */}

            <Row className = "cardBorder" style={{ backgroundColor: "#f5f5f5", height: "27vh", position: "relative" }}>
                <Container style={{ width: "70%" }}>
                    <Row >
                        <Col md={3}>
                            <Image src={`https://yelpnivali.s3-us-west-2.amazonaws.com/profilee_${this.state._id}`} thumbnail style={{ marginTop: "50px", position: "absolute", height: "100%", width: "80%" }} />
                        </Col>
                        <Col md={9}>
                            <div className="vertical-center">
                                <Row>
                                    <Col md={12}>
                                        <h2>
                                            {this.state.firstName} {this.state.lastName}
                                        </h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p>{this.state.city}, {this.state.state}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Row style={{ marginLeft: "1px" }}>

                                            <p>{this.state.phoneNumber} | {this.state.emailId}</p>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                
                                <BsStarFill color="red" style={{ marginLeft: "15px", marginRight: "5px", marginTop: "3px" }} /> {this.state.reviews.length} Reviews
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <div style={{ marginTop: "70px", width: "80%", position: "absolute" }}>
                                <p style={{ marginBottom: "20px" }}>{this.state.firstName}'s Profile</p>


                                <ListGroup>
                                    <ListGroup.Item action onClick={() => { this.changeTab("reviews") }} style={{ marginBottom: "10px" }}>Reviews</ListGroup.Item>
                                    <ListGroup.Item action onClick={() => { this.changeTab("events") }} style={{ marginBottom: "10px" }}>Events</ListGroup.Item>
                                </ListGroup>
                            </div>


                        </Col>
                        <Col md={6} style={{ marginTop: "30px" }}>
                            {this.state.selectedTab === "reviews" ? (
                                <div>
                                    <h4 style={{marginBottom:"20px",color:"red",marginLeft:"auto",marginRight:"auto",width:"93%"}}>Reviews</h4>
                                <Container>
                                    {this.state.reviews.map((item)=>{
                                        return <Review review={item}></Review>
                                    })}
                                </Container>
                                </div>
                            )
                             : (
                                 <div>
                                      <h4 style={{marginBottom:"20px",color:"red",marginLeft:"auto",marginRight:"auto",width:"93%"}}>Events</h4>
                                     <Container>
                                         {
                                             this.state.events.map((item)=>{
                                                return <Event event={item}></Event>
                                            })
                                         }
                                     </Container>
                                 </div>
                             )}

                        </Col>
                        <Col md={3}>
                            <div style={{ marginTop: "30px" }}>
                                <Row>
                                    <Col md={1}>
                                        <div style={{ borderLeft: "1px solid rgb(167, 167, 167)", height: "420px" }} />
                                    </Col>
                                    <Col md={10}>
                                        <Row>
                                            <h4 style={{ color: "red" }}>About {this.state.firstName}</h4>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row md={12}>
                                                    <b>Location</b>
                                                </Row>
                                                <Row md={12}>
                                                    <p>{this.state.city}, {this.state.state}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>

                                                <Row md={12}>
                                                    <b>Yelping Since</b>
                                                </Row>
                                                <Row md={12}>

                                                    <p>{this.state.yelpingSince}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <Row md={12}>
                                                    <b>Things I Love</b>
                                                </Row>
                                                {this.state.thingsILove?
                                                <Row md={12}>
                                                    
                                                    {this.state.thingsILove.split(",").map(item=>{
                                                        return <Badge style={{margin:"5px",backgroundColor:"#E75480",color:"white"}} pill>
                                                        {item}
                                                      </Badge>
                                                    })}
                                                </Row>:null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <Row md={12}>
                                                    <b>Find Me In</b>
                                                </Row>
                                                <Row md={12}>
                                                    <p>{this.state.findMeIn}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <Row md={12}>
                                                    <b>favorites</b>
                                                </Row>
                                                {this.state.favorites?
                                                <Row md={12}>
                                                {this.state.favorites.split(",").map(item=>{
                                                        return <Badge style={{margin:"5px",color:"white"}} variant="warning">
                                                        {item}
                                                      </Badge>
                                                    })}
                                                </Row>:null}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <Row md={12}>
                                                    <b>Website</b>
                                                </Row>
                                                <Row md={12}>
                                                    <p>{this.state.myWebsite}</p>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>




            </Row>


            {/* <Col style={{ color: "red", textAlign: "left", fontSize: "30px", marginBottom: "20px" }}>
                    <b>Profile</b>
                </Col>
                <Form>
                    <div style={{ marginBottom: "80px" }}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>First Name</b></Form.Label>
                            <Form.Control onChange={this.onChangeFirstName} value={this.state.firstName} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="First Name" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Last Name</b></Form.Label>
                            <Form.Control onChange={this.onChangeLastName} value={this.state.lastName} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Last Name" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Email Address</b></Form.Label>
                            <Form.Control onChange={this.onChangeEmail} value={this.state.emailId} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Email Address" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Nickname</b></Form.Label>
                            <Form.Control onChange={this.onChangeNickName} value={this.state.nickName} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Nickname" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>City</b></Form.Label>
                            <Form.Control onChange={this.onChangeCity} value={this.state.city} style={{ width: "110%", float: "left", marginBottom:"15px" }} type="text" placeholder="City" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>State</b></Form.Label>
                            <Form.Control onChange={this.onChangeState} value={this.state.state} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="State" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Country</b></Form.Label>
                            <Form.Control onChange={this.onChangeCountry} value={this.state.country} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Country" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Zip code</b></Form.Label>
                            <Form.Control onChange={this.onChangeZipCode} value={this.state.zipCode} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Zip Code" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label><b>Phone Number</b></Form.Label>
                            <Form.Control onChange={this.onChangePhoneNumber} value={this.state.phoneNumber} style={{ width: "110%", float: "left", marginBottom:"15px"}} type="text" placeholder="Phone Number" />
                        </Form.Group>
                    </div>
                    <Button onClick={this.onProfile} variant="danger" block>Save Changes</Button>
                </Form> */}
            {/* </Container> */}
        </div>
    }
}

const mapStateToProps = (state) => {
    return { userProfile: state.userProfile, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps, { profileFetch })(Profile);