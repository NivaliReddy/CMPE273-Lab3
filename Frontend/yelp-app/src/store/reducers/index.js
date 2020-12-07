const jwt_decode = require('jwt-decode');

const initialState={

    userDetails:{},
    restaurantDetails:{},
    userType:"customer"
}

const reducer=(state=initialState,action)=>{
    if(action.type==='LOGOUT'){
        return {
            ...state,
            isLoggedIn:false,
            userDetails:{}
        }
    }
    if(action.type==='LOGIN'){
        console.log('In Login reducer');
        let userdata = {}
        console.log(action.payload)
        if(action.payload.status === 200){
            var decoded = jwt_decode(action.payload.data.split(' ')[1]);
        
        userdata.data = JSON.parse(decoded.user);
        }
        
        console.log(userdata)
        return {
            ...state,
            isLoggedIn:true,
            userType:"customer",
            userDetails:userdata,
            loginResponse: action.payload
        }
    }
    if(action.type==='SIGNUP'){
        console.log('In signup reducer');
        let userdata = {}
        console.log(action.payload)
        if(action.payload.status === 200){
            var decoded = jwt_decode(action.payload.data.split(' ')[1]);
        
        userdata.data = JSON.parse(decoded.user);
        }
        
        console.log(userdata)
        return {
            ...state,
            isLoggedIn:true,
            userDetails:userdata,
            userSignupDetails: action.payload
        }
    }
    if(action.type==='PROFILE'){
        return {
            ...state,
            userDetails:action.payload
        }
    }
    if(action.type==='RESTAURANTS'){
        return {
            ...state,
            restaurants:action.payload
        }
    }
    if(action.type==='CURRENTRESTAURANT'){
        return {
            ...state,
            currentRestaurant:action.payload
        }
    }
    if(action.type==='EVENTS'){
        return {
            ...state,
            events:action.payload
        }
    }
    if(action.type==="CURRENTEVENT"){
        return {
            ...state,
            currentEvent:action.payload
        }
    }
    if(action.type==="RESLOGIN"){
        console.log('In Login reducer');
        let restaurantdata = {}
        console.log(action.payload)
        if(action.payload.status === 200){
            var decoded = jwt_decode(action.payload.data.split(' ')[1]);
        
            restaurantdata.data = JSON.parse(decoded.restaurant);
        }
        
        console.log(restaurantdata)
        return {
            ...state,
            userType:"restaurant",
            isLoggedIn:true,
            restaurantDetails:restaurantdata,
            restaurantLoginResponse: action.payload
        }
    }
    if(action.type==="RESSIGNUP"){
        console.log('In Restaurant signup reducer');
        let restaurantdata = {}
        console.log(action.payload)
        if(action.payload.status === 200){
            var decoded = jwt_decode(action.payload.data.split(' ')[1]);
        
            restaurantdata.data = JSON.parse(decoded.restaurant);
        }
        
        console.log(restaurantdata)
        return {
            ...state,
            userType:"restaurant",
            isLoggedIn:true,
            restaurantDetails:restaurantdata,
            restaurantSignupResponse: action.payload
        }
    }
    if(action.type==="RESPROFILE"){
        return {
            ...state,
            restaurantDetails:action.payload
        }
    }
    if(action.type==="PROFILEFETCH"){
        return{
            ...state,
            userProfile:action.payload
        }
    }
    if (action.type === "USERORDER") {
        return {
            ...state,
            userOrder: action.payload
        }
    }
    if (action.type === "RESTAURANTORDER") {
        return {
            ...state,
            restaurantOrder: action.payload
        }
    }
    if (action.type === "RESTAURANTORDERS") {
        return {
            ...state,
            restaurantOrder: action.payload
        }
    }
    if (action.type === "ADDDISH") {
        return {
            ...state,
            restaurantDetails:action.payload
            }
    }
    if (action.type === "ADDEVENT") {
        return {
            ...state,
            restaurantDetails:action.payload
            }
    }
    if (action.type === "MESSAGELIST") {
        return {
            ...state,
            messageList:action.payload
            }
    }
    if (action.type === "REGISTEREVENT") {
        return {
            ...state,
            userDetails:action.payload
            }
    }
    
return state;
}

export default reducer;