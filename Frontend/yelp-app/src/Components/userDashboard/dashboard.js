import React, { Component } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { getAllRestaurants } from "../../store/actions/index";
import { connect } from "react-redux";
import Map from "../googleMap/googleMap";
import RestaurantCard from "../restaurantCard/restaurantCard";
import Axios from "axios";
import { GrPrevious, GrNext } from 'react-icons/gr';
import {graphql} from 'react-apollo'
import { gql } from 'apollo-boost';
import { apiURL } from '../../util/config';

const _ = require("lodash");

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      searchTxt: "",
      limit: 3,
      page: 1,
      currentPage: 1,
      totalPages: 1
    };
  }

  componentDidUpdate = async (prevProps, prevState) => {

    if (JSON.stringify(prevState) != JSON.stringify(this.state)) {
        const page = this.state.page;
        const limit = this.state.limit;
      
        
        await this.props.getAllRestaurants(page, limit);

        this.setState({
          restaurants: this.props.restaurants.data.restaurants,
          totalPages: this.props.restaurants.data.totalPages,

        });
      
    }
  }

  componentDidMount = async () => {
    const page = this.state.page;
    const limit = this.state.limit;
    await this.props.getAllRestaurants(page, limit);

    this.setState({
      restaurants: this.props.restaurants.data.restaurants,
      totalPages: this.props.restaurants.data.totalPages
    });
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

  changedSearchtext = (e) => {
    this.setState({ searchTxt: e.target.value })
  }

  searchHandler = (e) => {
    
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.get(apiURL + '/restaurants/?restaurantName=' + this.state.searchTxt).then((res => {
      this.setState({ restaurants: res.data.restaurants })
    })).catch(err => console.log(err));
  }

  render = () => {
    return (
      <div>
        <Row>
          <Col md={2}>
            <Container style={{ marginTop: "30px" }}>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Search"
                    onChange={this.changedSearchtext}
                  />
                </Form.Group>
                <Container>
                  <Button variant="danger" style={{ width: "100%" }} onClick={this.searchHandler}>
                    Search
              </Button>
                </Container>
              </Form>
            </Container>
          </Col>
          <Col m={7}>
            {this.state.restaurants.map((item) => {
              return <RestaurantCard {...item} />;
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
          <Col md={3}>
            <Map></Map>
          </Col>
        </Row>
      </div>
    );
  };
}

const searchText=gql`
{
    restaurants{
        _id
      restaurantName
      location
      cuisines
      modeOfDelivery
    }
  }
`;

const mapStateToProps = (state) => {
  return { restaurants: state.restaurants };
};

export default compose(
  graphql(searchText),
  connect(mapStateToProps, { getAllRestaurants })(Dashboard)
);