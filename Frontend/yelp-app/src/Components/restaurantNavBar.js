

import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl'
import { Container, Col, Row } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";

import { Link } from 'react-router-dom';

import { connect } from 'react-redux'

class NavBar extends Component {

 
    logout=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn',false);
        this.props.onLogout();
    }

    render = () => {
        return (
            <div>

                <Navbar bg="light" variant="light">

                    <Row>
                        <Col md="auto">
                        <Nav.Link href="/"><Image src="https://s3-media0.fl.yelpcdn.com/assets/public/logo_desktop_xsmall_outline@2x.yji-0aade8725c91582a386d6d01dc973b74.png" thumbnail></Image></Nav.Link>

                        </Col>

                        <div style={{ position: "absolute", right: "0" }}>
                            <Nav className="mr-auto">
                            <Link to="/restaurantDashBoard" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Dasboard</Button></Link>
                            <Link to="/restaurantEvents" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Events</Button></Link>
                            <Link to="/restaurantOrders" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Orders</Button></Link>
                            <Link to="/messages" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Messages</Button></Link>
                            <Button onClick={this.props.onLogout} variant="light">Logout</Button>
                            </Nav>
                        </div>
                    </Row>
                </Navbar>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
    });
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
