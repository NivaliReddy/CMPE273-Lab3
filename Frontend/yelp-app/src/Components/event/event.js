import React, { Component } from 'react';
import { Row, Card, Container, Col, Image } from 'react-bootstrap';
import { event ,registerForAnEvent} from '../../store/actions/index';
import { connect } from 'react-redux';
import EventCard from './eventCard';

import eventImage from '../images/event.png';

class Event extends Component {
    state = {
        events: []
    }

    componentDidMount = async () => {
        await this.props.event();
        this.setState({ events:this.props.events.data.events })
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
                <Row className = "cardBorder" style={{ height: "350px", backgroundColor: "#f5f5f5" }}>
                    <Container style={{ width: "65%" }}>
                        <Row>
                            <h4 style={{color:"#d32323",position:"relative",marginTop:"20px"}}> Event Spotlight</h4>
                        </Row>
                        <Row>
                        <Image style={{ width: "100%", height: "80%",marginTop:"25px",position:"relative" }} src={eventImage}></Image>
                        </Row>
                    </Container>
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <Container style={{ width: "65%" }}>
                    <h4 style={{color:"#d32323",position:"relative",marginTop:"20px"}}>Popular Events</h4>
                        {cardOutput}
                    </Container>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { events: state.events, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps, { event })(Event);