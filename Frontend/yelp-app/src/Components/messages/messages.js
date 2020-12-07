import React, { Component } from 'react';
import MessageList from './messageList'
 import Conversation from './conversation'
import './messages.css'
import { Row, Col } from 'react-bootstrap';

class Messages extends Component {


    state = {
        selectedMessageId: null,
    }


    selectMessage = (value) => {
        this.setState({ selectedMessage: null },()=>{
            console.log(value)
            this.setState({ selectedMessageId: value })
        })
    }
    render = () => {
    //     let conv;
    //     if (this.state.selectedMessage != null) {
    //         conv = (<Conversation messages={this.state.selectedMessage} />)
    //     }
    //     else {
    //         conv = (<div className="section">
    //             <h1 className="selectText">
    //                 Please select a Coversation
    // </h1>
    //         </div>)
    //     }

    //     console.log(this.state.selectedMessage)
        return (
            <div>
                <Row>
                    <Col md="4">
                    <MessageList selectMessage={this.selectMessage} />
                    </Col>
                    <Col md="8">
                        {this.state.selectedMessageId?<Conversation selectedMessageId={this.state.selectedMessageId} />:<div className="section">
                 <h1 className="selectText">
                     Please select a Coversation
     </h1>
             </div>}
                    {null}
                    </Col>
                </Row>
            </div>
        )
    };
}

export default Messages;