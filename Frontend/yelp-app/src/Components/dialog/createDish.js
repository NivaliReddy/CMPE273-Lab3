import React from 'react';
import { Modal, Col, Row, Container, Button, Form } from 'react-bootstrap';
import { addDish } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

class CreateDish extends React.Component {
    state = {}


    onChangeDishName = (e) => {
        this.setState({ dishName: e.target.value })
    }

    onChangeMainIngredients = (e) => {
        this.setState({ mainIngredients: e.target.value })
    }

    onChangePrice = (e) => {
        this.setState({ price: e.target.value })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDishCategory = async (e) => {
        this.setState({
            dishCategory: e.target.value
        })
    }

    onCreateDish = async (e) => {
        e.preventDefault()
        let rest={...this.props.restaurantDetails}
        
        let data = {
            dishId:rest.data.menu.length+1,
            dishName: this.state.dishName,
            mainIngredients: this.state.mainIngredients,
            pictures: this.state.pictures,
            price: this.state.price,
            description: this.state.description,
            dishCategory: this.state.dishCategory
        }
        rest.data.menu.push(data)
        await this.props.addDish(this.props.restaurantDetails.data._id,data,rest);
        console.log(this.props.restaurantMenu);
        this.props.changeDashboard()
        this.props.handleClose()
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
                        <Modal.Title>Enter the dish details to add to your menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Container style={{ width: "50%" }}>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Control type="dishName" placeholder="dishName" required onChange={this.onChangeDishName} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Main Ingredients" required onChange={this.onChangeMainIngredients} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="number" placeholder="Price" required onChange={this.onChangePrice} />
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
                                    <Col md={12}>
                                        <Form.Group controlId="exampleForm.ControlInput2">
                                            <Form.Control type="text" placeholder="Dish Category" required onChange={this.onChangeDishCategory} />
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row><label for="picture"><b>Dish Image 
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Input  />
                        </Form.File>
                        </b></label> </Row>  

                            </Container>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
          </Button>
                        <Button onClick={this.onCreateDish} variant="danger">Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return { restaurantDetails: state.restaurantDetails, isLoggedIn:state.isLoggedIn }
}

export default connect(mapStateToProps, { addDish })(CreateDish);