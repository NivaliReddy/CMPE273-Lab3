import React from 'react'
import { Form, Container, Row, Col, Button, Image, ListGroup, Card } from "react-bootstrap";

import { BsCalendarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

import {Link} from 'react-router-dom';

import { BiCalendarEvent } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md'

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

const event = (props) => {
    let eventPath='/eventDetails/'+props._id
    console.log(eventPath)
    console.log(props)
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img style={{ height: "200px" }} variant="top" src={events[(props.eventId - 1) % 10]} />
                <Card.Body>
                <Link style={{color:"#0073bb"}} to={eventPath} ><Card.Title>{props.eventName}</Card.Title></Link>
                    <Card.Text>
                        <Row style = {{marginBottom: "10px"}}>
                            <Col md = {"auto"}>
                                <BiCalendarEvent/>
                            </Col>
                            <Col>
                                {props.startDate} - {props.endDate}, {props.time}
                            </Col>
                        </Row>
                        <Row style = {{marginBottom: "10px"}}>
                            <Col md = {"auto"}>
                                <MdLocationOn/>
                            </Col>
                            <Col>
                                {props.city}, {props.state}, {props.country}
                            </Col>
                        </Row>
                        <Container>
                            <Row>
                                {props.description}
                            </Row>
                        </Container>
                    </Card.Text>
                    <hr/>
                    <Button variant="danger" style = {{float: "right"}}>Register</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default event