import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { ChatList } from 'react-chat-elements'
import { connect } from 'react-redux';
import axios from 'axios';

import { getMessagesofUser, getMessagesOfRestaurant } from './../../store/actions/index'

class MessageList extends Component {
    state = {
        data: [

        ]
    }

    onClickHandler = (e) => {
        this.props.selectMessage(e.id)
    }
    componentDidUpdate=async (prevProps,prevState)=>{
        if(JSON.stringify(prevProps)!=JSON.stringify(this.props)){
            
            if (this.props.userType === "customer") {
                await this.props.getMessagesofUser(this.props.userDetails.data._id)
            }
            else {
                console.log(this.props)
                await this.props.getMessagesOfRestaurant(this.props.restaurantDetails.data._id)
            }
            console.log(this.props.messageList)
            this.setState({
                data:this.props.messageList
            })
        }
    }
    componentDidMount = async () => {
        console.log(this.props)
        if (this.props.userType === "customer") {
            await this.props.getMessagesofUser(this.props.userDetails.data._id)
        }
        else {
            console.log(this.props)
            await this.props.getMessagesOfRestaurant(this.props.restaurantDetails.data._id)
        }
        console.log(this.props.messageList)
        this.setState({
            data:this.props.messageList
        })
    }

    render() {

        const list2 = this.state.data.map((item) => {
            if (this.props.userType === "customer") {
                return { title: item.restaurant.restaurantName, subtitle: item.messages[item.messages.length - 1].message, id: item._id }
            }
            else {
                return { title: item.user.firstName, subtitle: item.messages[item.messages.length - 1].message, id: item._id }
            }
        })
        return (
            <div style={{ width: '100%' }}>
                <ChatList className='chat-list' dataSource={list2} onClick={this.onClickHandler} />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return ({

    });
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
        userType: state.userType,
        messageList:state.messageList,
        restaurantDetails: state.restaurantDetails
    };
};


export default connect(mapStateToProps, { getMessagesofUser, getMessagesOfRestaurant })(MessageList);