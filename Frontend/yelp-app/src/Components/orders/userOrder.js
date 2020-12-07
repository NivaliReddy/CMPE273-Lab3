import React, { Component } from 'react'

import { connect } from 'react-redux';
import { getUserProfile } from '../../store/actions/index';
import { Image, Container, Col, Row, Button, Form, FormLabel } from 'react-bootstrap'

import {FcPlus,FcMinus} from 'react-icons/fc'
import {AiFillMinusCircle} from 'react-icons/ai'

import {createOrder} from '../../store/actions/index'
import { Redirect } from 'react-router-dom';

class userOrder extends Component {

    state = {
        menu: [],
        addedItem:{
        },
        cart:{

        },
        modeOfDelivery:"Pick up",
        orderPlaced: 0
    }

    changeModeOfDelivery=(e)=>{
        this.setState({modeOfDelivery:e.target.value})
    }

    componentDidUpdate = async (prevProps, prevState) => {

        if (JSON.stringify(prevState) != JSON.stringify(this.state)) {
          
            console.log('state changed')
            await this.props.getUserProfile(this.props.userId);
    
            this.setState({
              userDetails: this.props.userDetails
    
            });
          
        }
      }

    componentDidMount=()=>{
            this.setState({menu:this.props.currentRestaurant.data.menu})
    }

    increaseQuantity=(key)=>{
        let cart={...this.state.cart}
        cart[key].quantity++
        this.setState({cart:cart})
    }

    decreaseQuantity=(key)=>{
        let cart={...this.state.cart}
        cart[key].quantity--
        if (cart[key].quantity==0){
            this.removeItem(key)
        }
        else{
        this.setState({cart:cart})
        }
    }


    addItem=(item)=>{
        let temp={...item}
        let added={...this.state.addedItem}
        added[temp._id]=true
        temp.quantity=1
        let cart={...this.state.cart}
        cart[item._id]=temp
        this.setState({addedItem:added,cart:cart})
    }

    removeItem=(_id)=>{
        let removed={...this.state.addedItem}
        delete removed[_id]
        let cart={...this.state.cart}
        delete cart[_id]
        this.setState({addedItem:removed,cart:cart})
    }

    postOrder=async (e)=>{
        console.log(this.props.currentRestaurant)
        if (await this.props.createOrder(this.props.userId,{
            orderStatus:"New Order",
            orderDate:new Date().toLocaleDateString(),
            orderTime:new Date().toLocaleTimeString(),
            modeOfDelivery:this.state.modeOfDelivery,
            restaurantId:this.props.currentRestaurant.data._id
        })){
            window.alert('Order placed!');
            this.setState({redirect:<Redirect to="/orders"/>})
        }
        this.setState({orderPlaced: (this.state.orderPlaced+1)})
        window.alert('Order placed!');
    }

    render = () => {
        let total=0
        for(let i in this.state.cart){
            total+=(this.state.cart[i].quantity)*(this.state.cart[i].price)
        }
        return <div>
            {this.state.redirect}
            <Container>
                <Form>
                    <Row>
                        <FormLabel>
                            <Form.Control style={{ width: "181%", float: "left" }} type="text" placeholder="Delivery address" />
                        </FormLabel>
                    </Row>
                    <br />

                    <hr></hr>
                    <h5>Add Items to cart</h5>
                    <br></br>
                    <Row>
                        {this.state.menu.map(item=>{
                            return (<Col md={12}>
                                <Row style={{marginBottom:"30px"}}>
                                    <Col md="6">
                                    {item.dishName}
                                    </Col>
                                    <Col md="6" >

                                      {this.state.addedItem[item._id]?<Button style={{ backgroundColor: "#f43939", border: "1px solid #d32323",float:"right" }} size="sm" onClick={()=>{
                                          this.removeItem(item._id)
                                      }}>Remove Item</Button>:<Button style={{ backgroundColor: "#f43939", border: "1px solid #d32323",float:"right" }} size="sm" onClick={()=>{
                                        this.addItem(item)
                                    }}>Add Item</Button>}
                                    </Col>
                                </Row>
                            </Col>)
                        })}
                </Row>
                <hr></hr>
                    <Row style={{marginTop:"30px",marginBottom:"30px"}}>
                        <Col md="12">
                            {Object.keys(this.state.cart).map(function(key, index) {
                                return (
                                    <Row>
                                        <Col md="6">
                                            {this.state.cart[key].dishName}
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                                <Col md="auto">
                                                <AiFillMinusCircle onClick={ ()=>{this.decreaseQuantity(key)}}style={{color:"red"}}></AiFillMinusCircle>
                                                </Col>
                                                <Col md="auto">
                                                {this.state.cart[key].quantity}
                                                </Col>
                                                <Col md="auto">
                                                    <FcPlus onClick={ ()=>{this.increaseQuantity(key)}}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
},this)}
                        </Col>
                </Row>
                {total!=0?(<div>
                    <Row>
                    
                    <Col md="12">
                        <Row>
                            <Col>
                            <b>total</b>
                            </Col>
                            <Col style={{float:"right"}}>
                                {total}$
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12">
                    <Form.Label>Mode of Delivery</Form.Label>
    <Form.Control onChange={this.changeModeOfDelivery} as="select">
      <option>Pick Up</option>
      <option>Delivery</option>
    </Form.Control>
                    </Col>
                    <hr>
                    </hr>
                </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col md="12">
                        <Button onClick={this.postOrder} style={{ backgroundColor: "#f43939", border: "1px solid #d32323" }} block>Order Now</Button>
                        </Col>
                    </Row>
                </div>):(
                    <Row>
                        <Col>
                        <b>
                            Add items above to place order!
                        </b>
                        </Col>
                    </Row>
                )}
                
                </Form>
            </Container>
        </div>
    }
}


const mapStateToProps = (state) => {
    return { currentRestaurant: state.currentRestaurant,userId:state.userDetails.data._id }
}

export default connect(mapStateToProps,{ createOrder, getUserProfile })(userOrder);