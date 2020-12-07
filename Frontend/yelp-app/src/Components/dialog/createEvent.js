import React from 'react'
import { Modal, Col, Row, Container, Button, Form } from 'react-bootstrap'
import { addEvent } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

class CreateEvent extends React.Component {
    state = {}

    onChangeEventName = (e) => {
        this.setState({ eventName: e.target.value })
    }

    onChangeStartDate = (e) => {
        this.setState({ startDate: e.target.value })
    }

    onChangeEndDate = (e) => {
        this.setState({ endDate: e.target.value })
    }

    onChangeCity = (e) => {
        this.setState({ city: e.target.value })
    }

    onChangeState = (e) => {
        this.setState({ state: e.target.value })
    }

    onChangeCountry = (e) => {
        this.setState({ country: e.target.value })
    }

    onChangeDescription = (e) => {
        this.setState({description: e.target.value })
    }

    onChangeTime = async (e) => {
        this.setState({time: e.target.value})
    }

    onChangeHashTags = (e) => {
        this.setState({ hashTags: e.target.value })
    }

    onCreateEvent = async (e) => {
        let rest={...this.props.restaurantDetails}
        
        let data = {
            eventId:rest.data.events.length+1,
            eventName: this.state.eventName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            description: this.state.description,
            time: this.state.time,
            hashTags: this.state.hashTags,
            restaurantId: this.props.restaurantDetails.data._id
        }
        rest.data.events.push(data)
        await this.props.addEvent(this.props.restaurantDetails.data._id, data,rest);
        //this.props.changeEvents();
        this.props.handleClose();
    }

    render = () => {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.handleClose}
                    size="lg"
                    centered
                    aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Container style={{ width: "50%" }}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control type="eventName" placeholder="Event Name" required onChange={this.onChangeEventName} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Start Date" required onChange={this.onChangeStartDate} />
                                        </Form.Group>
                                    </Col>
                            
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="End Date" required onChange={this.onChangeEndDate} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="City" required onChange={this.onChangeCity} />
                                        </Form.Group>
                                    </Col>
                                
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="State" required onChange={this.onChangeState} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Country" required onChange={this.onChangeCountry} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Description" required onChange={this.onChangeDescription} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Time" required onChange={this.onChangeTime} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Hash Tags" required onChange={this.onChangeHashTags} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Container>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button onClick={this.onCreateEvent} variant="danger">Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { restaurantDetails: state.restaurantDetails, isLoggedIn:state.isLoggedIn }
}

export default connect(mapStateToProps, { addEvent })(CreateEvent);