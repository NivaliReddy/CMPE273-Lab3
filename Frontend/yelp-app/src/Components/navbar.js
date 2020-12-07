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

    profile = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', true);
        this.props.onProfile();
    }

    logout = (e) => {
        e.preventDefault();
        sessionStorage.setItem('isLoggedIn', false);
        this.props.onLogout();
    }

    render = () => {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Nav.Link href="/"><Image src="https://s3-media0.fl.yelpcdn.com/assets/public/logo_desktop_xsmall_outline@2x.yji-0aade8725c91582a386d6d01dc973b74.png" thumbnail></Image></Nav.Link>

                    <div style={{ marginLeft: "200px" }}>
                        <Form inline>

                            <Col md="auto">
                                <Row>
                                    <FormControl size="lg" style={{ borderRight: "none" }} type="text" placeholder="tacos, cheap dinner,Max's" className="mr-sm-2" />
                                </Row></Col>

                            <Col md="auto" >
                                <Row>
                                    <FormControl size="lg" style={{ borderLeft: "none", marginLeft: "-6px" }} type="text" placeholder="San Jose, CA" className="mr-sm-2" />
                                </Row></Col>
                            <Col md="auto">
                                <Row>
                                    <Button size="lg" variant="danger"  >
                                        <BsSearch color="white" />
                                    </Button>
                                </Row>
                            </Col>
                        </Form>
                    </div>

                    <div style={{ position: "absolute", right: "0" }}>
                        <Nav className="mr-auto">
                            <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Users</Button></Link>
                            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Dasboard</Button></Link>
                            <Link to="/events" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Events</Button></Link>
                            <Link to="/orders" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Orders</Button></Link>
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Profile</Button></Link>
                            <Link to="/messages" style={{ textDecoration: 'none', color: 'white' }}><Button variant="light">Messages</Button></Link>
                            <Button onClick={this.props.onLogout} variant="light">Logout</Button>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onProfile: () => dispatch({ type: 'PROFILE' })
    });
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);