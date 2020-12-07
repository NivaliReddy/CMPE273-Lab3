import React, { Component } from 'react'
import { getRestaurantById } from '../../../store/actions/index';
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Image, Container, Col, Row, Button, } from 'react-bootstrap'
import { ImCheckmark } from "react-icons/im";
import Carousel from "react-multi-carousel";
import Reviews from "../../Reviews/userReview";
import Menu from "../../menu/menu";
import CreateDish from '../../dialog/createDish'
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GrPrevious, GrNext } from 'react-icons/gr';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const images = [
    "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/05/21/BX1803__fried-chicken-sandwiches_s4x3.jpg.rend.hgtvcom.826.620.suffix/1590083550520.jpeg",
    "https://cdn3.tmbi.com/toh/GoogleImages/Southern-Fried-Chicken-with-Gravy_exps33285_THRAA2874593C01_23_1b_RMS.jpg",
    "https://hips.hearstapps.com/delish/assets/17/36/1504715566-delish-fettuccine-alfredo.jpg",
    "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe-1366x768.jpg",
    "https://www.thespruceeats.com/thmb/3CSORjFsgqkA7AY6XMguUlsmyCM=/5101x2869/smart/filters:no_upscale()/GettyImages-639389404-5c450e724cedfd00015b09d5.jpg",
    "https://www.roughguides.com/wp-content/uploads/2014/12/Edited-9-Dosa-CXHGB4.jpg",
    "https://thumbor.thedailymeal.com/RD4wRbXWH39G0X24ZCgKStNV6iA=/870x565/https://www.thedailymeal.com/sites/default/files/slideshows/2022427/2199623/13.jpg",
    "https://theblackhorsefindon.co.uk/wp-content/uploads/2020/02/chinese-625_625x350_81466064119.jpg",
    "https://images.squarespace-cdn.com/content/v1/5a53ae322278e7169a744c59/1556575937878-TCF1PV4W9DBQN3E8W4JK/ke17ZwdGBToddI8pDm48kGB1Vu1IO5PKLGYtbkYEbFcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYwL8IeDg6_3B-BRuF4nNrNcQkVuAT7tdErd0wQFEGFSnBV-E9i2EVqde5Cb9xE3BFT0Y0y81fgQTRF5_KQn2Dt-hnH6vQz70q521Loj74v26g/iStock-523044922hortcrop.jpg",
    "https://www.thespruceeats.com/thmb/1QoEFkpjZh0U2pxIociGJhzxDTY=/2723x2042/smart/filters:no_upscale()/easy-chocolate-ice-cream-recipe-1945798-hero-01-45d9f26a0aaf4c1dba38d7e0a2ab51e2.jpg",
    "https://cdn.tasteatlas.com/images/dishes/5291b5f2fcee42849cd84a03bff55e0a.jpg?w=600&h=450",
    "https://www.thedailymeal.com/sites/default/files/2019/11/18/Hero_classic_desserts_dreamstime.jpg",
    "https://cdn.cnn.com/cnnnext/dam/assets/181128174108-07-50-sweets-travel-chocolate-chip-cookies.jpg",
    "https://goboldwithbutter.com/BoldWithButter/media/recipe_images/Imported/best-buttermilk-pancakes.jpg?ext=.jpg"
]

class RestaurantPage extends Component {

    state = {
        averageRating: 4,
        reviews: [],
        menu: [],
        showModal: false,
        changed: false,
        limit: 3,
        page: 1,
        currentPage: 1,
        totalPages: 1
    }


    changedDashboard = (e) => {
        this.setState({ ...this.props.restaurantDetails.data })
    }
    componentDidMount = async () => {
        let data={}

        this.setState({ ...this.props.restaurantDetails.data })
    }
    
    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });

    render = () => {
        let rate = this.state.averageRating
        let starSettings = {
            size: 25,
            value: rate,
            edit: false,
            activeColor: "red",
            // filledIcon: <i className="fa fa-star" />,
            halfIcon: <i className="fa fa-star-half-alt" />,
            // emptyIcon: <i className="far fa-star" />,
            filledIcon: <i className="fa fa-star" />,
        };

        return (
            <div>
                <CreateDish changeDashboard={this.changedDashboard} handleClose={this.handleClose} show={this.state.showModal} />
                <Carousel
                    ssr
                    partialVisbile
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {images.map(item => { return (<Image style={{ width: "100%", height: "250px", paddingLeft: "2px", paddingRight: "2px" }} src={item} />) })}
                </Carousel>
                <br />
                <Container style={{ width: "80%" }}>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md="6">
                                            <Row>
                                                <h1 className="ResHeading">{this.state.restaurantName}</h1>
                                            </Row>
                                        </Col>

                                        <Col md="6">

                                            <div style={{ float: "right" }}>
                                                <BsPencil color="#0073bb" style={{ marginRight: "5px" }} />
                                                <Link to="/updateRestaurantProfile" style={{ color: "#0073bb" }}>Update profile</Link>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Row style={{ color: "grey" }}>
                                        <h5 style={{ fontWeight: "400" }}>{this.state.cuisines}</h5>
                                    </Row>
                                    <Row>
                                        <Col md="auto" style={{ paddingRight: "25px" }}>
                                            <Row>
                                                <h6 style={{ color: "#05a882" }}>Open</h6>
                                            </Row>
                                        </Col>
                                        <Col md="auto">
                                            <Row>
                                                {this.state.timings}
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Row>
                                                <ReactStars {...starSettings} />
                                                <Col>
                                                    <p style={{ color: "grey", marginTop: "13px" }}>
                                                        {this.state.reviews.length} reviews
                                </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6">
                                            <div style={{ float: "right" }}>
                                                <Button onClick={this.handleShow} style={{ backgroundColor: "#f43939", border: "1px solid #d32323" }}>Add Dish to Menu</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <h2 style={{ fontWeight: "600" }}>Menu</h2>
                            </Row>
                            <br />
                            <Row>
                                <Container>
                                    {this.state.menu.map((item, index) => {
                                        return <Menu index={index} menu={item} />
                                    })}
                                    <div>
                                        <Container style={{ width: "50%" }}>
                                            <Row>
                                                <Col md="auto">
                                                    {this.state.page != 1 ?
                                                        <Button variant="danger" onClick={this.previousPage}> <GrPrevious /></Button> : null}
                                                </Col>
                                                <Col md="auto" style={{ textAlign: "center" }}>
                                                    <h4>{this.state.page}</h4>
                                                </Col>
                                                <Col md="auto">
                                                    {this.state.page != this.state.totalPages ?
                                                        <Button variant="danger" onClick={this.nextPage}> <GrNext /> </Button> : null}
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </Container>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <h2 style={{ fontWeight: "600" }}>Reviews</h2>
                            </Row>
                            <br />
                            <Row>
                                <Container>
                                    {this.state.reviews.map(item => {
                                        return <Reviews review={item} />
                                    })}
                                </Container>
                            </Row>
                            <hr />
                            <Row>
                                <h5 style={{ fontWeight: "600" }}>Location and Timings</h5>
                            </Row>
                            <br />
                            <Row>
                                {this.state.location}, {this.state.timings}
                            </Row>
                            <Row>
                                <br />
                                <h5 style={{ fontWeight: "600" }}>Amenities and more</h5>
                            </Row>
                            <br />
                            <Row>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Accepts Credit Cards</Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Garage Parking</Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Bike Parking</Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Wheelchair Accessible</Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Dogs Allowed</Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col md="6">
                                    <Container>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={"auto"}>
                                                <ImCheckmark color="green" /></Col><Col md={"auto"}>Full Bar</Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { restaurantDetails: state.restaurantDetails }
}

export default connect(mapStateToProps)(RestaurantPage);