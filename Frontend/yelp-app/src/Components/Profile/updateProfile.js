import React, { Component } from "react";
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap";
import { profile , uploadUserProfile} from '../../store/actions/index';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from "react-router";

class Profile extends Component {
    state={
        redirect:null
    }

    onChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value })
    }
    onChangeLastName = (e) => {
        this.setState({ lastName: e.target.value })
    }
    onChangeEmail = (e) => {
        this.setState({ emailId: e.target.value })
    }
    onChangeNickName = (e) => {
        this.setState({ nickName: e.target.value })
    }
    onChangeCity = (e) => {
        this.setState({ city: e.target.value })
    }
    onChangeState = (e) => {
        this.setState({ state: e.target.value })
    }
    onChangeCountry = (e) => {
        this.setState({ country: e.target.value })
    }
    onChangeZipCode = (e) => {
        this.setState({ zipCode: e.target.value })
    }
    onChangePhoneNumber = (e) => {
        this.setState({ phoneNumber: e.target.value })
    }
    onChangeFindMeIn = (e) => {
        this.setState({ findMeIn: e.target.value })
    }
    onChangeGender = (e) => {
        this.setState({ gender: e.target.value })
    }
    onChangeHeadline = (e) => {
        this.setState({ headline: e.target.value })
    }
    onChangeMyFavorites = (e) => {
        this.setState({ favorites: e.target.value })
    }
    onChangeMyWebsite = (e) => {
        this.setState({ myWebsite: e.target.value })
    }
    onChangeThingsILove = (e) => {
        this.setState({ thingsILove: e.target.value })
    }
    onChangeYelpingSince = (e) => {
        this.setState({ yelpingSince: e.target.value })
    }
    onChangePicture = (e) => {
        this.setState({ picture: e.target.value })
    }
    
    onProfileSave = async (e) => {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            nickName: this.state.nickName,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipCode: this.state.zipCode,
            phoneNumber: this.state.phoneNumber,
            findMeIn: this.state.findMeIn,
            gender: this.state.gender,
            headline: this.state.headline,
            favorites: this.state.favorites,
            myWebsite: this.state.myWebsite,
            thingsILove: this.state.thingsILove,
            yelpingSince: this.state.yelpingSince,
            picture: this.state.picture
        }
        await this.props.profile(data, this.state._id);
        console.log(this.props.userDetails);
        if (this.props.userDetails.status === 200) {
            sessionStorage.setItem('id', this.props.userDetails.data.id)
            sessionStorage.setItem('isLoggedIn', true)
            
            this.setState({ redirect: <Redirect to="/profile" /> })
        }
    }

    onFileSelect = async (e) => {
        const fd = new FormData();
    fd.append('upl', e.target.files[0])
    await axios.post("http://localhost:3001/upload/profile/" + this.state._id, fd)
    .then(async res => {
        window.alert("uploaded")
        console.log("upload profile")
        return true;
    })
    .catch(err => {
        window.alert("fail")
        console.log(err)
    }
)
    }

    componentDidMount=()=>{
        this.setState({...this.props.userDetails.data})
    }

    render = () => {
        console.log(this.props.userDetails)
        if(!this.props.isLoggedIn){
            this.setState({redirect:<Redirect to="/" />})
        }
        return <div>
            {this.state.redirect}

            <Container style={{width:"50%"}}>
            <div style={{ textAlign: "left", marginBottom: "5px", marginTop: "50px" }}>
                                <Row>
                                    <Col md={12} style={{ color: "red", fontSize: "25px", fontWeight:"700"}}>
                                        Profile
                                    </Col>
                                </Row>
                                
            </div>
            <hr></hr>
            
            <form style={{marginTop: "0px", marginLeft:"18px"}}>
                <div class="form-group">
                    <Row><label for="picture"><b>Your Profile Photo <a href="url">
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Input onChange={this.onFileSelect} />
                        </Form.File>
                        </a></b></label> </Row>  
                    <Row><Image src={this.state.filePreviewUrl} style={{ position: "absolute", height: "6%", width: "4%" }} /></Row>           
                </div>
            </form>
            <br/><br/>
            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="firstname"><b>First Name</b></label>
                    <small id="emailHelp" class="form-text text-muted">This field is required.</small>
                    <input type="text" onChange={this.onChangeFirstName} value={this.state.firstName} class="form-control" id="firstname"></input>
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="lastname"><b>Last Name</b></label>
                    <small id="emailHelp" class="form-text text-muted">This field is required. Only your last initial will show on your profile.</small>
                    <input type="text" onChange={this.onChangeLastName} value={this.state.lastName} class="form-control" id="lastname"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="nickname"><b>Nickname</b></label>
                    <small id="emailHelp" class="form-text text-muted">The Boss, Calamity Jane, The Prolific Reviewer</small>
                    <input type="text" onChange={this.onChangeNickName} value={this.state.nickName} class="form-control" id="nickname"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="city"><b>City</b></label>
                    <small id="emailHelp" class="form-text text-muted">City</small>
                    <input type="text" onChange={this.onChangeCity} value={this.state.city} class="form-control" id="city"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="state"><b>State</b></label>
                    <small id="emailHelp" class="form-text text-muted">The Boss, Calamity Jane, The Prolific Reviewer</small>
                    <input type="text" onChange={this.onChangeState} value={this.state.state} class="form-control" id="state"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="country"><b>Country</b></label>
                    <small id="emailHelp" class="form-text text-muted">Country</small>
                    <input type="text" onChange={this.onChangeCountry} value={this.state.country} class="form-control" id="country"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="zipCode"><b>Zip Code</b></label>
                    <small id="emailHelp" class="form-text text-muted">Zip Code</small>
                    <input type="text" onChange={this.onChangeZipCode} value={this.state.zipCode} class="form-control" id="zipCode"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="phoneNumber"><b>Phone Number</b></label>
                    <small id="emailHelp" class="form-text text-muted">Phone Number</small>
                    <input type="text" onChange={this.onChangePhoneNumber} value={this.state.phoneNumber} class="form-control" id="phoneNumber"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
            <label><b>Gender</b></label>
                <div class="form-group form-check">
                    <input class="form-check-input" type="radio" onChange={this.onChangeGender} value={this.state.gender} name="gender" id="female" value="female" ></input>
                    <label class="form-check-label" for="female">
                    Female
                    </label>   
                </div>
                <div class="form-group form-check">
                    <input class="form-check-input" type="radio" onChange={this.onChangeGender} value={this.state.gender} name="gender" id="male" value="male" ></input>
                    <label class="form-check-label" for="male">
                    Male
                    </label>   
                </div>
                <div class="form-group form-check">
                    <input class="form-check-input" type="radio" onChange={this.onChangeGender} value={this.state.gender} name="gender" id="other" value="other" ></input>
                    <label class="form-check-label" for="other">
                    Other
                    </label>   
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="headline"><b>Your Headline</b></label>
                    <small id="emailHelp" class="form-text text-muted">Taco Tuesday Aficionado, The Globetrotting Reviewer</small>
                    <input type="text" class="form-control" onChange={this.onChangeHeadline} value={this.state.headline} id="headline" ></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="thingsILove"><b>I Love...</b></label>
                    <small id="emailHelp" class="form-text text-muted">Comma separated phrases (e.g. sushi, Radiohead, puppies)</small>
                    <textarea class="form-control" onChange={this.onChangeThingsILove} value={this.state.thingsILove} id="thingsILove" rows="3"></textarea>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="findMeIn"><b>Find Me In</b></label>
                    <small id="emailHelp" class="form-text text-muted">Nob Hill, the newest brunch spot, a turtleneck</small>
                    <input type="text" class="form-control" onChange={this.onChangeFindMeIn} value={this.state.findMeIn} id="findMeIn"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="myWebsite"><b>My Blog Or Website</b></label>
                    <small id="emailHelp" class="form-text text-muted">www.example.com/myawesomeblog</small>
                    <input type="text" class="form-control" onChange={this.onChangeMyWebsite} value={this.state.myWebsite} id="myWebsite"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="favorites"><b>My Favorites</b></label>
                    <small id="emailHelp" class="form-text text-muted">www.example.com/myawesomeblog</small>
                    <input type="text" class="form-control" onChange={this.onChangeMyFavorites} value={this.state.favorites} id="favorites"></input>    
                </div>
            </form>

            <form style={{marginTop: "0px"}}>
                <div class="form-group">
                    <label for="yelpingSince"><b>Yelping Since</b></label>
                    <small id="emailHelp" class="form-text text-muted">mm/dd/yyyy</small>
                    <input type="text" class="form-control" onChange={this.onChangeYelpingSince} value={this.state.yelpingSince} id="yelpingSince"></input>    
                </div>
            </form>
            <div style={{ textAlign: "center", marginBottom: "50px", marginTop:"20px" }}>
                                <Row>
                                    <Col md={3}>
                                        <Button onClick={this.onProfileSave} variant="danger" block>Save Changes</Button>
                                    </Col>
                                    <Col md={3}>
                                        <Button  variant="light" block>Cancel</Button>
                                    </Col>
                                </Row>
                                
            </div>
            
            </Container>
        </div>
    }
}

const mapStateToProps = (state) => {
    return { userDetails: state.userDetails, isLoggedIn:state.isLoggedIn }
}

export default connect(mapStateToProps, { profile })(Profile);