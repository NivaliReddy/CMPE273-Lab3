import React, { Component } from 'react';
import { Row, Card, Container, Col, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventCard from './eventCard';
import { Redirect } from 'react-router-dom';
import CreateEvent from './../../dialog/createEvent';
import { GrPrevious, GrNext } from 'react-icons/gr';

class Event extends Component {
    state = {
        events: [],
        showDialogue: false,
        limit: 3,
        page: 1,
        currentPage: 1,
        totalPages: 1
    }

    createEventDialogue = () => {
        this.setState({ showDialogue: true })
    }

    changeEvents = (e) => {
        this.setState({ ...this.props.restaurantDetails.data });
    }

    closeHandler = () => {
        this.setState({ showDialogue: false })
    }
    componentDidMount = async () => {
        const page = this.state.page;
        const limit = this.state.limit;
        if (!this.props.isLoggedIn) {
            this.setState({ redirect: <Redirect to="/"></Redirect> })
        }

        this.setState({ events: this.props.events })
    }

    nextPage = () => {
        if (this.state.page < this.state.totalPages) {
            this.setState({
                page: this.state.page + 1
            })
        }
    }

    previousPage = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    render = () => {
        let cardOutput = [];
        for (let i = 0; i < this.state.events.length; i += 3) {
            cardOutput.push(<Row style={{ marginTop: "40px", marginBottom: "40px" }}>
                {i < this.state.events.length ? <Col>
                    <EventCard {...this.state.events[i]} />
                </Col> : null}

                {i + 1 < this.state.events.length ? <Col>
                    <EventCard {...this.state.events[i + 1]} />
                </Col> : null}

                {i + 2 < this.state.events.length ? <Col>
                    <EventCard {...this.state.events[i + 2]} />
                </Col> : null}
            </Row>)
        }
        console.log(this.props.events);
        return (
            <div>
                {this.state.redirect}
                {this.state.showDialogue ? <CreateEvent changeEvents={this.changeEvents} show={this.state.showDialogue} handleClose={this.closeHandler} /> : null}
                <Row style={{ marginTop: "30px" }}>
                    <Container style={{ width: "65%" }}>
                        <Row>
                            <Col md="6">
                                <h4 style={{ color: "#d32323", position: "relative", marginTop: "20px" }}>Posted Events</h4>
                            </Col>
                            <Col md="6" >
                                <Button style={{ float: "right", marginTop: "10px" }} variant="danger" onClick={this.createEventDialogue}> Create Event</Button>
                            </Col>
                        </Row>
                        {cardOutput}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { events: state.restaurantDetails.data.events, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps)(Event);