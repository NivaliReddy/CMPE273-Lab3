import React from 'react';
import { getUserProfile } from '../../store/actions/index';
import { connect } from 'react-redux';
import OrderCard from './orderCard';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { GrPrevious, GrNext } from 'react-icons/gr';

class OrdersPage extends React.Component {

    state = {
        orders: [],
        filters: [false, false, false, false],
        limit: 3,
        page: 1,
        currentPage: 1,
        totalPages: 1
    }

    selectedFilter = (filterValue) => {

        let data = this.props.userOrder
        let filteredOrders = []
        for (let i of data) {
            if (i.orderStatus === filterValue) {
                filteredOrders.push(i);
            }
        }
        this.setState({ orders: filteredOrders })
    }

    componentDidMount = async () => {
        await this.props.getUserProfile(this.props.userId);

        this.setState({ orders: this.props.userOrder });

        console.log(this.state);
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
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="2">
                            <Row>
                                <b>Filters</b>
                            </Row>
                            <br />
                            <Row>
                                <b> Order Status Filters</b>
                            </Row>
                            <Form>
                                <Row>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkBox" label="Order Received" onClick={() => {
                                            this.selectedFilter("Order Received")
                                        }} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check onClick={() => {
                                            this.selectedFilter("Preparing")
                                        }} type="checkBox" label="Preparing" />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkBox" label="Delivered" onClick={() => {
                                            this.selectedFilter("Delivered")
                                        }} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkBox" label="Picked Up" onClick={() => {
                                            this.selectedFilter("Picked Up")
                                        }} />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                        <Col md="10">
                            {this.state.orders.map(item => {
                                return <OrderCard {...item} />
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
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { userOrder: state.userDetails.data.orders, userId: state.userDetails.data._id, isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateToProps, { getUserProfile })(OrdersPage);