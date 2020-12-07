import React from 'react'
import {Modal,Col,Row,Container,Button,Form} from 'react-bootstrap'

import {Link} from 'react-router-dom'


const columns = [
    { dataField: 'userName', text: 'User Name' },
  ]

   

export default class CreateDish extends React.Component{
    state={}

    
    render=()=>{
        console.log(this.props)
       return  <div>
            <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
    <Modal.Title>Registered users fot the event {this.props.eventName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {this.props.users?
            <Container>
                {this.props.users.map(item=>{
                    let profileLink='/userProfile/'+item.userId
                    return <Row>
                        <Col md="12">
                            <Link to={profileLink}>{item.userName}</Link>
                        </Col>
                    </Row>
                })}
            </Container>:null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    }
}