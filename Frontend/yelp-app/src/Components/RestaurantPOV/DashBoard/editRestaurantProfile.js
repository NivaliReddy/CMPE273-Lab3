import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import { restaurantProfile } from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

class RestaurantProfile extends Component {
    state={
        redirect:null
    }

    onRestaurantProfile = async (e) => {
        let data = {
            restaurantName: this.state.restaurantName,
            emailId: this.state.emailId,
            location: this.state.location,
            description: this.state.description,
            contactNumber: this.state.contactNumber,
            pictures: this.state.pictures,
            timings: this.state.timings,
            cuisines: this.state.cuisines,
            modeOfDelivery: this.state.modeOfDelivery
        }
        let restaurantDetails={...this.props.restaurantDetails.data,...data}

        await this.props.restaurantProfile(data, restaurantDetails._id,{status:200,data:restaurantDetails});
        console.log(this.props.restaurantDetails);
        if (this.props.restaurantDetails.status === 200) {
            sessionStorage.setItem('id', this.props.restaurantDetails.data.id)
            sessionStorage.setItem('isLoggedIn', true)
            this.setState({ redirect: <Redirect to="/restaurantDashboard" /> })
        }
        else {

        }
    }

    save = async () => {
        const data = {
            restaurantName: this.state.restaurantName,
            emailId: this.state.emailId,
            location: this.state.location,
            description: this.state.description,
            contactNumber: this.state.contactNumber,
            pictures: this.state.pictures,
            timings: this.state.timings,
            cuisines: this.state.cuisines,
            modeOfDelivery: this.state.modeOfDelivery
        };

        console.log(this.props)
        let response = await this.props.updateRestaurantProfile({
            variables: {
                restaurantDetails: data,
                id: this.state.restaurantName
            }
        })
        console.log(response);

        this.props.onSave(response.data.updateRestaurantProfile)
        this.editDescCancel();
        this.editContactCancel();
        this.editLocCancel();
    };

    onChangeRestaurantName = (e) => {
        this.setState({ restaurantName: e.target.value })
    }
    onChangeEmail = (e) => {
        this.setState({ emailId: e.target.value })
    }
    onChangeLocation = (e) => {
        this.setState({ location: e.target.value })
    }
    onChangeDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    onChangeContactNumber = (e) => {
        this.setState({ contactNumber: e.target.value })
    }
    onChangeTimings = (e) => {
        this.setState({ timings: e.target.value })
    }
    onChangeCuisines = (e) => {
        this.setState({ cuisines: e.target.value })
    }
    onChangeModeOfDelivery = (e) => {
        this.setState({ modeOfDelivery: e.target.value })
    }

    componentDidMount=()=>{
        console.log(this.props.restaurantDetails)
        this.setState({...this.props.restaurantDetails.data})
    }

    render = () => {
        console.log(this.props.restaurantDetails)
        if(!this.props.isLoggedIn){
            this.setState({redirect:<Redirect to="/" />})
        }
        return <div>
            {this.state.redirect}
            
         
            <Container style={{width:"50%"}}>
            <Form>
                <div style={{marginBottom:"50px", marginTop:"50px"}}>
                <Row><h1>Update details:</h1></Row>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control onChange={this.onChangeRestaurantName} value={this.state.restaurantName} style={{ width: "70%", float: "right" }} type="text" placeholder="Restaurant Name" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email Address</Form.Label>
                    <Form.Control onChange={this.onChangeEmail} value={this.state.emailId} style={{ width: "70%", float: "right" }} type="text" placeholder="Email Address" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Location</Form.Label>
                    <Form.Control onChange={this.onChangeLocation} value={this.state.location} style={{ width: "70%", float: "right" }} type="text" placeholder="Location" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.onChangeDescription} value={this.state.description} style={{ width: "70%", float: "right" }} type="text" placeholder="Description" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Contact Number</Form.Label>
                    <Form.Control onChange={this.onChangeContactNumber} value={this.state.contactNumber} style={{ width: "70%", float: "right" }} type="text" placeholder="Contact Number" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Timings</Form.Label>
                    <Form.Control onChange={this.onChangeTimings} value={this.state.timings} style={{ width: "70%", float: "right" }} type="text" placeholder="Timings" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Cuisines</Form.Label>
                    <Form.Control onChange={this.onChangeCuisines} value={this.state.cuisines} style={{ width: "70%", float: "right" }} type="text" placeholder="Cuisines" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Mode of Delivery</Form.Label>
                    <Form.Control onChange={this.onChangeModeOfDelivery} value={this.state.modeOfDelivery} style={{ width: "70%", float: "right" }} type="text" placeholder="Mode of Delivery" />
                </Form.Group>
                </div>
                <Button onClick={this.onRestaurantProfile} variant="danger" block>Save</Button>
            </Form>
            </Container>
        </div>
    }
}

const updateRestaurantProfile = gql`
mutation updateRestaurantProfile($restaurantDetails:restaurantInput!,$id:String!){
    updateRestaurantProfile(restaurant:$restaurantDetails,id:$id)
    {
        _id
        restaurantName
        emailId
        location
        description
        contactNumber
        pictures
        timings
        cuisines
        modeOfDelivery
    }
  }
`;

const mapStateToProps = (state) => {
    return { restaurantDetails: state.restaurantDetails,isLoggedIn:state.isLoggedIn }
}

export default compose(graphql(updateUserProfile, { name: "updateUserProfile" }),
    connect(mapStateToProps, { restaurantProfile })(RestaurantProfile)
);