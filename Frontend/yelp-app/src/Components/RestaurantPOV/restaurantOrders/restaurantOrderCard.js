import React from 'react';
import { Link } from 'react-router-dom';
import { Container, CardGroup, Card, Row, Col, Dropdown, DropdownButton, Button,Spinner } from 'react-bootstrap';


const styles = {
    card: {
    },
    cardImage: {
        margin: "20",
        objectFit: 'cover',
    }
}

const orderImages = ["https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
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

export default function RestaurantOrderCard(props) {
    const [cssClass, setClass] = React.useState("noCardHover");
    let resPath = "/userProfile/" + props.userId;
    console.log(props);

    return (
        <div>
            <Container  style={{ marginTop: "20px", marginBottom: "20px" }}>
                <CardGroup className="d-block">
                    <Card className={cssClass} style={styles.card}
                        onMouseEnter={() => setClass("border-0 shadow")}
                        onMouseLeave={() => setClass("noCardHover")}
                    >
                        
                        {props.load&&props.loadId===props.orderId?<div style={{height:"200px"}}>
                            <Col md={6}>

                            <Spinner style={{float:"right",marginTop:"100px"}}animation="grow" variant="danger" />
                            </Col>
                        </div>
                        :
                        <Row>
                        
                            <Col md={4} >
                                <Card.Img style={{margin:"20",width:"100%",height:"100%",margin:"0"}} src={orderImages[(props.orderId - 1) % 10]} style={styles.cardImage} />
                            </Col>
                            <Col>
                                <Card.Body md={8}>
                                    <Container >
                                        <Row>
                                            <Col md="6">
                                                <Row style={{ marginTop: "10px", marginLeft: "0px" }}>

                                                    <Link to={resPath} ><h4> {props.firstName} {props.lastName} </h4></Link>
                                                </Row>
                                                <Row style={{ marginTop: "10px", marginLeft: "0px" }}>
                                                   <b>Order Time: </b> <p>{props.orderTime}</p>
                                                </Row>
                                                <Row style={{ marginTop: "5px", marginLeft: "0px" }}>
                                                    <b>Current Status: </b> <p>{props.orderStatus}</p>
                                                </Row>
                                                <Row style={{ marginTop: "5px", marginLeft: "0px" }}>
                                                    <b>Mode Of Delivery: </b><p>{props.modeOfDelivery}</p>
                                                </Row>
                                            </Col>
                                            <Col md="6">
                                                <Row style={{ float: "right", fontSize: "20px", color: "grey" }}>
                                                    {props.orderDate}
                                                </Row>
                                                <br />
                                                <Row style={{marginTop:"70px",float:"right",width:"100%"}}>
                                                    <Col md="12">
                                                    <div style={{float:"right"}}>
                                                    <select id="dropdown-basic-button" value={props.orderStatus} onChange={(e) => { props.changeStatus(e, props._id) }}>
                                                        <option value="Order received">Order received</option>
                                                        <option value="Preparing">Preparing</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Picked up">Picked up</option>
                                                    </select>
                                                    </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:"70px",float:"right",width:"100%"}}>
                                                    <Button variant="danger" onClick={async ()=>{
                                                        await props.postAMessage(props.restaurantId,props.userId,"We are connecting to let you know some updates regarding your order.",props.messageList,"restaurant");
                                                        //redirect 
                                                        props.redirectFunc()
                                                    }}> Message Customer</Button>
                                                </Row>
                                                <br />
                                            </Col>
                                        </Row>

                                    </Container>
                                </Card.Body>
                            </Col>
                        </Row>}
                    </Card>
                </CardGroup>
            </Container>
        </div>
    )
}