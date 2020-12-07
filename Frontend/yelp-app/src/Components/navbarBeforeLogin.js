

import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import {  Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default class navbar extends Component {

    state = {
        isUser:true
    }

    changeUser = (e) => {
        e.preventDefault()
        if (this.state.user === "user")
            this.setState({ user: "restaurant" })
        else
            this.setState({ user: "user" })
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

                            <Col md="auto" >
                                <Nav className="mr-auto">
                                <Col md="auto">
                                    <BootstrapSwitchButton
                                        onstyle="danger"
                                        checked={this.state.isUser}
                                        onlabel='User'
                                        offlabel='Business'
                                        onChange={(checked) => {
                                            this.setState({ isUser: checked })
                                        }}
                                        width={100}
                                    />
                                    </Col>
                                    {this.state.isUser ?
                                        (<div>
                                            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Button className="btn default" variant="light">Login</Button></Link>

                                            <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}><Button variant="danger">Signup</Button></Link></div>) :
                                        (
                                            <div>
                                                <Link to="/restaurantLogin" style={{ textDecoration: 'none', color: 'white' }}><Button className="btn default" variant="light">Login</Button></Link>

                                                <Link to="/restaurantSignup" style={{ textDecoration: 'none', color: 'white' }}><Button variant="danger">Signup</Button></Link>
                                            </div>
                                        )
                                    }
                                </Nav>
                            </Col>
                        </div>

                    </Row>

                </Navbar>
            </div>
        )
    }
}