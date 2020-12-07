import React, { Component } from 'react';
import { getEventById,registerForAnEvent } from '../../store/actions/index';
import { connect } from 'react-redux';
import Map from '../googleMap/googleMap';
import { Image, Container, Col, Row, Button } from 'react-bootstrap';
import { BiCalendarEvent } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import ReactStars from "react-rating-stars-component";

const events = ["https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/irving-redesign/Events_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg",
    "https://media-exp1.licdn.com/dms/image/C561BAQE-51J-8KkMZg/company-background_10000/0?e=2159024400&v=beta&t=Q12vAJMqewqj4hg_PFaP4SVuvhtJoQ4y8qqsEImZT4g",
    "https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2017/12/22223742/Events-1200x630.jpg",
    "https://wcci.webster.ch/wp-content/uploads/2018/03/Untitled2.png",
    "https://www.img-events.com/wp-content/uploads/revslider/jina_main_slider/slide-03.jpg",
    "https://www.australia.com/content/australia/en_us/events/_jcr_content/hero/mobile.adapt.768.high.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtQbxlZz__SwDJoNcEV6_E5IQWNtT4HSAtig&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSp0GAAxPTmkS6bhyKgpjtEeIkNoJ2gg3dvlw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQb-J30LSslBv8Qw2cqDfrTm11LJQLAfiIvGQ&usqp=CAU",
    "https://www.313presents.com/assets/img/313-presents-little-caesars-arena-events-detroit-6029bbc675.jpg"
]

class EventPage extends Component {

    state = {

    }


    starSettings = {
        size: 15,
        value: 4.5,
        edit: false,
        activeColor: "red",
        // filledIcon: <i className="fa fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        // emptyIcon: <i className="far fa-star" />,
        filledIcon: <i className="fa fa-star" />,
    };

    register=async ()=>{
        let user={...this.props.userDetails}
        user.data.events.push(this.state)
        await this.props.registerForAnEvent(this.props.match.params.eventId,user.data._id,user)
    }

    componentDidMount = async () => {
        const eventId = this.props.match.params.eventId;
        await this.props.getEventById(eventId)
        this.setState({ ...this.props.event.data })
        console.log(this.state)
    }

    render = () => {
        let registered=false;

        for(let i of this.props.userDetails.data.events){
            if(i._id===this.props.match.params.eventId){
                registered=true;
                break
            }
        }

        return (
            <div>
                <Row className = "cardBorder" style={{ height: "350px", backgroundColor: "#f5f5f5" }}>
                    <Container style={{ width: "65%" }}>
                        <Row>
                            <Col md = "12">
                                <h2 style = {{margin : "15px", fontWeight: "700"}}>{this.state.eventName}</h2>
                            </Col>
                        </Row>
                        <Row style={{ height: "300px", marginTop: "15px", position: "relative" }}>
                            <Col md="8">
                                <Container style={{ height: "100%" }}>
                                    <Row style={{ height: "100%" }}>
                                        <Col md="6">
                                            <Image style={{ height: "100%", width: "100%" }} variant="top" src={events[(this.state.eventId - 1) % 10]} />
                                        </Col>

                                        <Col md="6" className = "cardBorder" style = {{backgroundColor: "white"}}>
                                            <Container style={{ marginTop: "25px" }}>
                                                <Row style={{ height: "50%" }}>
                                                    <Col md={"auto"}>
                                                        <MdLocationOn/>
                                                    </Col>
                                                    <Col>
                                                        <Container>
                                                            <Row>
                                                                {this.state.city}, {this.state.state}, {this.state.country}
                                                            </Row>
                                                            <Row>
                                                                <ReactStars {...this.starSettings} />
                                                            </Row>
                                                        </Container>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row style={{ height: "50%" }}>
                                                    <Col md={"auto"}>
                                                        <BiCalendarEvent />
                                                    </Col>
                                                    <Col>
                                                        {this.state.startDate} - {this.state.endDate}, {this.state.time}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>

                            <Col md="4">
                                <Map></Map>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Container style = {{width: "65%", marginTop: "75px"}}>
                <Row>
                    <Col md = "8">
                        <Row>
                            <Col md = "12">
                                <h6 style = {{color: "#d32323", fontWeight: "700"}}>What/Why:</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md = "12">
                            {this.state.description}
                            </Col>
                        </Row>
                        <Row>
                            <Col md = "12">
                                {this.state.city}
                            </Col>
                            <Col md = "12">
                                {this.state.state}, {this.state.country}
                            </Col>
                        </Row>
                    </Col>

                    <Col md = "4">
                        <Row>
                            <Col md = "12">
                                <h6 style = {{color: "#d32323", fontWeight: "700"}}>Are you interested?</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md = "6" style = {{width: "100%", height: "100%", padding: "0px", margin: "0px"}}>
                                <Container style = {{width: "100%", height: "100%", margin: "0px"}}>
                                    {!registered?
                                    <Button style = {{width: "100%", backgroundColor: "#d32323", fontWeight: "500", border: "1px solid #d32323"}} onClick={this.register}>Register</Button>:<Button disabled ={true} style = {{width: "100%", backgroundColor: "#d32323", fontWeight: "500", border: "1px solid #d32323"}}> Already Registered</Button>}
                                </Container>
                            </Col>
                            <Col md = "6" style = {{width: "100%", height: "100%", padding: "0px", margin: "0px"}}>
                                <Container style = {{width: "100%", height: "100%", margin: "0px"}}>
                                    <Button style = {{width: "100%", backgroundColor: "#fff", color: "#666666", fontWeight: "500", border: "1px solid #ccc"}}>Sounds cool</Button>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { event: state.currentEvent,userDetails:state.userDetails }
}

export default connect(mapStateToProps, { getEventById ,registerForAnEvent})(EventPage);