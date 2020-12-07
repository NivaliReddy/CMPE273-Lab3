import React from 'react'
import { Form, Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";

import ReactStars from "react-rating-stars-component";

const restaurants = ["https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
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


const reviews = (props) => {
    let review = props.review;
    let restaurant = props.review.restaurant;
    let starSettings = {
        size: 20,
        value: review.rating,
        edit: false,
        activeColor: "red",
        // filledIcon: <i className="fa fa-star" />,
        // halfIcon: <i className="fa fa-star-half-alt" />,
        // emptyIcon: <i className="far fa-star" />,
        filledIcon: <i className="fa fa-star" />,
      };
    return (
        <div>
            <Row>
                <Col md={4}>
                    <Image src={restaurants[(restaurant.restaurantId-1)%10]} fluid ></Image>
                </Col>
                <Col md={8}>
                    <Row>
                        <Container>
                            <Row>
                                <h4 style={{ color: "red" }}> {restaurant.restaurantName}</h4>
                            </Row>
                            <Row>
                                <p>{restaurant.location}</p>
                            </Row>
                            <Row>
                                <p>{review.date}</p>
                            </Row>
                        </Container>
                    </Row>
                    
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <ReactStars {...starSettings} />
                </Col>
            </Row>
            <Row >
                <Col md={"auto"}>
                    <p>
                        {review.review}
                    </p>
                </Col>
            </Row>
            <hr></hr>
        </div>
    )
}

export default reviews