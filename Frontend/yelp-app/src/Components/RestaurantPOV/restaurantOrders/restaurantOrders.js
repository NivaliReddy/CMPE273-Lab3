import React from "react";
import { updateOrder, getRestaurantProfile,postAMessage } from "../../../store/actions/index";
import { connect } from "react-redux";
import RestaurantOrderCard from "./restaurantOrderCard";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { GrPrevious, GrNext } from 'react-icons/gr';
import { Redirect } from "react-router-dom";

class RestaurantOrdersPage extends React.PureComponent {
  state = {
    orders: [],
    load: false,
    loadId: "",
    newOrders: false,
    preparing: false,
    pickedUp: false,
    delivered: false,
    ordersReceived: false,
    limit: 3,
    page: 1,
    currentPage: 1,
    totalPages: 1,
    redirectVar:null
  };

  setRedirect=()=>{
    this.setState({redirectVar:<Redirect to="/messages"/>})
  }

  filter = () => {
    let result = [];
    let count = 0;
    let orders = this.props.restaurantDetails.data.orders;
    for (let i of orders) {

      if (this.state.newOrders) {
        if (i.orderStatus === "New Order") {
          result.push(i);
          continue;
        }
      } else {
        count++;
      }
      if (this.state.processing) {
        if (i.orderStatus === "Preparing") {
          result.push(i);
          continue;
        }
      } else {
        count++;
      }
      if (this.state.pickedUp) {
        if (i.orderStatus === "Picked Up") {
          result.push(i);
          continue;
        }
      } else {
        count++;
      }
      if (this.state.delivered) {
        if (i.orderStatus === "Delivered") {
          result.push(i);
          continue;
        }
      }
      else {
        count++;
      }
      if (this.state.ordersReceived) {
        if (i.orderStatus === "Order Received") {
          result.push(i);
          continue;
        }
      }
      else {
        count++;
      }
    }
    console.log(orders)
    if (count === 5 * orders.length) {

      this.setState({ orders: orders });
    } else {
      this.setState({ orders: result });
    }
  }

  filterNewOrders = (e) => {
    this.setState({ newOrders: !this.state.newOrders }, this.filter);
  };
  filterPreparingOrders = (e) => {
    this.setState({ processing: !this.state.processing }, this.filter);
  };

  filterPickedUpOrders = (e) => {
    this.setState({ pickedUp: !this.state.pickedUp }, this.filter);
  };
  filterDeliveredOrders = (e) => {
    this.setState({ delivered: !this.state.delivered }, this.filter);
  };
  filterordersRecieved = (e) => {
    this.setState({ ordersReceived: !this.state.ordersReceived }, this.filter);
  };

  changeStatus = async (e, orderId) => {
    console.log(orderId);
    console.log(e);
    let status = e.target.value;
    this.setState({ load: true, loadId: orderId });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let orders = [...this.state.orders];
    let index;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i]._id === orderId) {
        index = i;
        break;
      }
    }
    orders[index].orderStatus = status;
    let rest = { ...this.props.restaurantDetails };
    rest.data.orders = orders;
    await this.props.updateOrder(orderId, status, rest);
    this.setState({ orders: orders }, () => {
      this.setState({ load: false });
    });
  };

  changeOrder = (e, orderId) => {
    console.log(e, orderId);
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (JSON.stringify(prevState) != JSON.stringify(this.state)) {
      const page = this.state.page;
      const limit = this.state.limit;
      await this.props.getRestaurantProfile(this.props.restaurantDetails.data._id, limit, page)
      let orders = this.props.restaurantDetails.data.orders
      this.setState({ orders: orders, totalPages: this.props.restaurantDetails.data.totalPages });
    }
  }

  componentDidMount = async () => {
    const page = this.state.page;
    const limit = this.state.limit;
    await this.props.getRestaurantProfile(this.props.restaurantDetails.data._id, limit, page)
    let orders = this.props.restaurantDetails.data.orders
    this.setState({ orders: orders, totalPages: this.props.restaurantDetails.data.totalPages });
  };

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
        {this.state.redirectVar}
        <Container>
          <Row>
            <Col md="2">
              <Row>
                <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>Filter Orders by status</h4>
              </Row>
              <br />
              <Row>
                <Form>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      onChange={this.filterNewOrders}
                      label="New Orders"
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      onChange={this.filterordersRecieved}
                      label="Order Received"
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group
                    controlId="formBasicCheckbox"
                    onChange={this.filterPreparingOrders}
                  >
                    <Form.Check type="checkbox" label="Preparing" />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group
                    controlId="formBasicCheckbox"
                    onChange={this.filterDeliveredOrders}
                  >
                    <Form.Check type="checkbox" label="Delivered" />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Form>
                  <Form.Group
                    controlId="formBasicCheckbox"
                    onChange={this.filterPickedUpOrders}
                  >
                    <Form.Check type="checkbox" label="Picked Up" />
                  </Form.Group>
                </Form>
              </Row>
            </Col>
            <Col md="10">
              <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col md={12}>
                  <h3 style={{ color: "#d32323" }}>Food Orders</h3>
                </Col>
              </Row>
              {this.state.orders.map((item) => {
                return (
                  <RestaurantOrderCard
                    loadId={this.state.loadId}
                    load={this.state.load}
                    changeStatus={this.changeStatus}
                    changeOrder={this.changeOrder}
                    postAMessage={this.props.postAMessage}
                    messageList={this.props.messageList}
                    {...item}
                    redirectFunc={this.setRedirect}
                  />
                );
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
    );
  };
}

const mapStateToProps = (state) => {
  return {
    restaurantDetails: state.restaurantDetails,
    isLoggedIn: state.isLoggedIn,
    messageList:state.messageList
  };
};

export default connect(mapStateToProps, { updateOrder, getRestaurantProfile,postAMessage })(RestaurantOrdersPage);
