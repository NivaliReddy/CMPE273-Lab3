import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import axios from 'axios';
import { Input, Button } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import './messages.css'
import { connect } from 'react-redux';

import {postAMessage} from './../../store/actions'

class Messages extends Component {
    state = {
        messages: [
        ],
        newMessage: {

        }
        //...
    };

    componentDidUpdate=(prevProps,prevState)=>{
        if(JSON.stringify(prevProps)!=JSON.stringify(this.props)){
            let messages = []
        let selectedMesssage={}
        for(let i of this.props.messageList){
            if(i._id===this.props.selectedMessageId){
                selectedMesssage=i;
                break;
            }
        }
                for (let i of selectedMesssage.messages) {
                    if (this.props.userType === "customer") {
                        if (i.senderId === this.props.userDetails._id) {
                            messages.push(
                                new Message({
                                    id: 0,
                                    message: i.message,
                                })
                            )
                        }
                        else {
                            messages.push(
                                new Message({
                                    id: 1,
                                    message: i.message,
                                }))
                        }
                    }
                    else {
                        if (i.senderId === this.props.restaurantDetails._id) {
                            messages.push(
                                new Message({
                                    id: 0,
                                    message: i.message,
                                })
                            )
                        }
                        else {
                            messages.push(
                                new Message({
                                    id: 1,
                                    message: i.message,
                                }))
                        }
                    }
                }
                this.setState({ messages: messages })
        }
       
    }
    typeMessage = (e) => {
        if(this.props.userType==="customer"){
        this.setState({
            newMessage: {
                text: e.target.value,
                sender:"user"
            }
        })
    }else{
        this.setState({
            newMessage: {
                text: e.target.value,
                sender:"restaurant"
            }
        })
    }

    }

    componentDidMount=()=>{
        let messages = []
        let selectedMesssage={}
        for(let i of this.props.messageList){
            if(i._id===this.props.selectedMessageId){
                selectedMesssage=i;
                break;
            }
        }
                for (let i of selectedMesssage.messages) {
                    if (this.props.userType === "customer") {
                        if (i.senderId === this.props.userDetails._id) {
                            messages.push(
                                new Message({
                                    id: 0,
                                    message: i.message,
                                })
                            )
                        }
                        else {
                            messages.push(
                                new Message({
                                    id: 1,
                                    message: i.message,
                                }))
                        }
                    }
                    else {
                        if (i.senderId === this.props.restaurantDetails._id) {
                            messages.push(
                                new Message({
                                    id: 0,
                                    message: i.message,
                                })
                            )
                        }
                        else {
                            messages.push(
                                new Message({
                                    id: 1,
                                    message: i.message,
                                }))
                        }
                    }
                }
                this.setState({ messages: messages })
    }
    

    sendMessage = async (e) => {
        e.preventDefault()
        // axios.put('http://localhost:3001/messages/' + this.props.conversationId, this.state.newMessage)
        //     .then(response => {
        //         this.refs.input.clear();
        //         let messages = []
        //         for (let i of response.data.messages) {
        //             if (i.senderId === this.props.userDetails._id) {
        //                 messages.push(
        //                     new Message({
        //                         id: 0,
        //                         message: i.text,
        //                         senderName: i.sender
        //                     })
        //                 )
        //             }
        //             else {
        //                 messages.push(
        //                     new Message({
        //                         id: 1,
        //                         message: i.text,
        //                         senderName: i.sender
        //                     }))
        //             }
        //         }
        //         this.setState({ messages: messages })
            // }).catch(() => {
            //     window.alert("FAIL")
            // });

        let selectedMesssage={}
        for(let i of this.props.messageList){
            if(i._id===this.props.selectedMessageId){
                selectedMesssage=i;
                break;
            }
        }

        await this.props.postAMessage(selectedMesssage.restaurant._id,selectedMesssage.user._id,this.state.newMessage.text,this.props.messageList,this.state.newMessage.sender)
        this.refs.input.clear();
        

    }
    render = () => {

        return <div style={{ width: '100%' }}>
            <div className="chatFeeed">



                <ChatFeed
                    messages={this.state.messages}
                    showSenderName
                    bubbleStyles={
                        {
                            text: {
                                fontSize: 17
                            },
                            chatbubble: {
                                borderRadius: 20,
                                padding: 20
                            }
                        }
                    }
                />
            </div>
            <Input
                placeholder="Type here..."
                multiline={true}
                onChange={this.typeMessage}
                ref='input'
                rightButtons={
                    <Button
                        color='white'
                        backgroundColor='black'
                        text='Send'
                        onClick={this.sendMessage} />
                } />


        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return ({

    });
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails.data,
        messageList:state.messageList,
        userType:state.userType,
        restaurantDetails: state.restaurantDetails.data
    };
};

export default connect(mapStateToProps, {postAMessage})(Messages);