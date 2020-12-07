import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import NavBar from './navbar'
import LoginNavBar from './navbarBeforeLogin'
import Login from './Login/login'
import Signup from './SignUp/signUp'
import Profile from './Profile/profile'
import Event from './event/event'
import UserProfile from './userProfile'
import Orders from './orders/ordersPage'
import Users from './listOfUsers/listOfUsers'
import UpdateRestaurantProfile from './RestaurantPOV/DashBoard/editRestaurantProfile'
import RestaurantNavBar from './restaurantNavBar'
import RestaurantEvents from './RestaurantPOV/Events/Events'
import RestaurantDashboard from './RestaurantPOV/DashBoard/DashBoard'
import RestaurantOrders from './RestaurantPOV/restaurantOrders/restaurantOrders'
import RestaurantLogin from './restaurantAuth/restaurantLogin'
import restaurantSignup from './restaurantAuth/restaurantSignup'
import RestaurantPage from './RestaurantPage/restaurantPage'
import EventDetails from './eventDetails/eventDetails'
import Dashboard from './userDashboard/dashboard'
import UpdateProfile from './Profile/updateProfile'
import { connect } from 'react-redux'

import Messages from './messages/messages'

class Main extends Component {

    state = {

    }

    render = () => {

        let NavBarVar = LoginNavBar
        let HomeVar = Home
        if (this.props.isLoggedIn) {

            NavBarVar = NavBar
            HomeVar = Dashboard
            if (this.props.userType === "restaurant") {
                NavBarVar = RestaurantNavBar
                HomeVar = RestaurantDashboard
            }
        }
        return <div>
            <Route path="/" component={NavBarVar} />

            <Route exact path="/" component={HomeVar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/restaurantLogin" component={RestaurantLogin} />
            <Route exact path="/restaurantSignup" component={restaurantSignup} />
            <Route exact path="/updateProfile" component={UpdateProfile} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/events" component={Event} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/restaurantDashBoard" component={RestaurantDashboard} />
            <Route exact path="/restaurantEvents" component={RestaurantEvents} />
            <Route exact path="/restaurantOrders" component={RestaurantOrders} />
            <Route exact path="/updateRestaurantProfile" component={UpdateRestaurantProfile} />
            <Route exact path="/restaurant/:restaurantId" component={RestaurantPage} />
            <Route exact path="/eventDetails/:eventId" component={EventDetails} />
            <Route exact path="/userProfile/:userId" component={UserProfile} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/messages" component={Messages} />
        </div>
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
        userType: state.userType
    };
};

export default connect(mapStateToProps)(Main);