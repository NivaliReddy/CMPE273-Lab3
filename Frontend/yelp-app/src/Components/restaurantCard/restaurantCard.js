import React from 'react';
import ReactStars from "react-rating-stars-component";

import { Link } from 'react-router-dom';

import { ImCheckmark,ImCross } from "react-icons/im";

import { Container, CardGroup, Card, Row, Col } from 'react-bootstrap';

const styles = {
    card: {
    },
    cardImage: {
        margin:"20",
        objectFit: 'cover',
    }
}



const restaurantImages = ["https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    "https://restaurantengine.com/wp-content/uploads/2015/05/startup-restaurants-typically-overspend.jpg",
    "https://laistassets.scprdev.org/i/a2d799d39985f3c28dedbc47087bf824/5e78e5e1e56fcc00089d578c-eight.jpg",
    "https://media.timeout.com/images/105239239/image.jpg",
    "https://www.posist.com/restaurant-times/wp-content/uploads/2016/04/traits-successful-restaurant-business.jpg",
    "https://popmenucloud.com/cdn-cgi/image/width=1200,height=630,format=auto,fit=cover/jwxrmqov/8cb88920-5283-4b0f-a761-562a4a7e96d1.jpg",
    "https://kitv.images.worldnow.com/images/19471988_G.jpeg?auto=webp&disable=upscale&height=560&fit=bounds&lastEditedDate=1591420702000",
    "https://popmenucloud.com/cdn-cgi/image/width=412,height=412,fit=scale-down,format=auto,quality=60/xmcoatnl/6e3790e1-3cbb-4d7c-bacf-61a2d1487931.jpg"
]

export default function RestaurantCard(props) {
    const [cssClass, setClass] = React.useState("noCardHover");
    let starSettings = {
        size: 20,
        value: props.averageRating,
        edit: false,
        activeColor: "red",
        // filledIcon: <i className="fa fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        // emptyIcon: <i className="far fa-star" />,
        filledIcon: <i className="fa fa-star" />,
    };
    let resPath="/restaurant/"+props._id
    return (
        <div>
            <Container fluid style={{marginTop:"20px",marginBottom:"20px"}}>
                <CardGroup className="d-block">
                    <Card className={cssClass} style={styles.card}
                    onMouseEnter={() => setClass("border-0 shadow")}
                    onMouseLeave={() => setClass("noCardHover")}
                    onClick={()=> setClass("cardAnimate")}
                    >
                        <Row>
                            <Col md={4}>
                                <Card.Img style={{margin:"20"}} src={restaurantImages[(props.restaurantId - 1) % 10]} style={styles.cardImage} />
                            </Col>
                            <Col>
                                <Card.Body md={8}>
                                    <Container fluid>
                                        <Row>
                                            <Col md={8}>
                                                 <Link style={{color:"black"}} to={resPath} ><h4> {props.restaurantName}</h4></Link>
                                                
                                                <ReactStars {...starSettings} />
                                                <p style={{ color: "grey" }}>{props.cuisines}</p>
                                            </Col>
                                            <Col md={4}>
                                                <Row style={{ float: "right", fontSize:"11px",color:"grey" }}>
                                                    {props.location}
                                                </Row>
                                            </Col>
                                        </Row>
                                        {props.modeOfDelivery?
                                        <Row>
                                            <Col md={4}>
                                            <Container>
                                                {props.modeOfDelivery.toLowerCase().includes("Dine In".toLowerCase())?(<Row><Col md={"auto"}><ImCheckmark color="green"/></Col><Col md={"auto"}> <Row>Dine-In </Row></Col></Row>):(<Row><Col md={"auto"}><ImCross color="red"/></Col><Col md={"auto"}> <Row>Dine-In</Row></Col></Row>)}      
                                            </Container>
                                            </Col>
                                            <Col md={4}>
                                            <Container>
                                            {props.modeOfDelivery.toLowerCase().includes("Pick up".toLowerCase())?(<Row><Col md={"auto"}><ImCheckmark color="green"/></Col><Col md={"auto"}> <Row>Pickup</Row></Col></Row>):(<Row><Col md={"auto"}><ImCross color="red"/></Col><Col md={"auto"}> <Row>Pickup</Row></Col></Row>)}
                                            </Container>
                                            </Col>
                                            <Col md={4}>
                                            <Container>
                                            {props.modeOfDelivery.toLowerCase().includes("Delivery".toLowerCase())?(<Row><Col md={"auto"}><ImCheckmark color="green"/></Col><Col md={"auto"}> <Row>Delivery</Row></Col></Row>):(<Row><Col md={"auto"}><ImCross color="red"/></Col><Col md={"auto"}> <Row>Delivery</Row></Col></Row>)}
                                            </Container>
                                            </Col>
                                        </Row>
:null}
                                        <Row style={{marginTop:"10px",marginLeft:"1px"}}>
                                            <b>{props.timings}</b>
                                        </Row>
                                        <Row style={{marginTop:"10px",marginLeft:"1px"}}>
                                            <p>{props.description}</p>
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