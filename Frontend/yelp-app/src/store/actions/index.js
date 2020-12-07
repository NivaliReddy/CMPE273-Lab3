import axios from 'axios';
import { apiURL } from '../../util/config'

export const login = (data) => async dispatch => {
    await axios.post(apiURL + "/auth/login/user", data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {

            if (res.status === 200) {
                dispatch({
                    type: 'LOGIN',
                    payload: res
                })

            } else {
                console.log(res)
                dispatch({
                    type: 'LOGIN',
                    payload: res
                })
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'LOGIN',
                payload: {"data": "fail" ,"status": "401"}
            })
            
            // dispatch({
            //     type: 'LOGIN',
            //     payload: {
            //         status: 200,
            //         data: {
            //             _id:"5fa17b13aca9a50dd66ea124",
            //             userId: 1,
            //             firstName: "kowshhal",
            //             lastName: "Uppu",
            //             emailId: "kowshhal@gmail.com",
            //             password: "qwerty",
            //             dataOfBirth: "1234",
            //             nickName: "kowshhal",
            //             city: "San Jose",
            //             state: "California",
            //             country: "USA",
            //             zipCode: "95110",
            //             headLine: "hello world",
            //             phoneNumber: "6693007583",
            //             yelpingSince: "today",
            //             thingsILove: "Games, Hiking, Eating, Reading",
            //             findMeIn: " Instagram",
            //             myWebsite: "hello.com",
            //             picture: "url",
            //             favorites: "Biryani,Fried Chicken, Sandwich, Cake",
            //             reviews: [
            //                 {
            //                     reviewId: 1,
            //                     date: "2nd October 2019",
            //                     rating: 4,
            //                     review: "It tastes good",
            //                     restaurant: {
            //                         restaurantId: 1,
            //                         restaurantName: "Paradise",
            //                         location: "San Jose, CA",
            //                     }
            //                 },
            //                 {
            //                     reviewId: 2,
            //                     date: "20th December 2020",
            //                     rating: 3,
            //                     review: "Its very spicy",
            //                     restaurant: {
            //                         restaurantId: 2,
            //                         restaurantName: "Palamuru Grill",
            //                         location: "San Jose, CA",
            //                     }
            //                 },
            //             ],
            //             events: [
            //                 {
            //                     eventId: 1,
            //                     eventName: "ganesh pandaga",
            //                     startDate: "12th October 2020",
            //                     endDate: "14th October 2020",
            //                     city: "San Jose",
            //                     state: "California",
            //                     country: "USA",
            //                     description: "pooja",
            //                     time: "12:00 am",
            //                     hashTags: "dasd,dwadw,qwdqd"
            //                 }
            //             ]

            //         }
            //     }

            // })
        }
        )
}

export const event = () => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL + "/events/?sortBy=startDate:desc&page=1&limit=100").then(async res => {
            
            if (res.status === 200) {
                dispatch({
                    type: 'EVENTS',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'EVENTS',
                payload: {
                    status: 200,
                    data: {
                        events: [
                            {
                                eventId: 1,
                                eventName: "ganesh pandaga",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "pooja",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            },
                            {
                                eventId: 2,
                                eventName: "Concert",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "concert",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            },
                            {
                                eventId: 3,
                                eventName: "Party",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "party",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            },
                            {
                                eventId: 4,
                                eventName: "Birthday",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "party",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            }
                        ]
                    }
                }
            })
        }
        )
}

export const getEventById = (id) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL + "/events/" + id, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'CURRENTEVENT',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'CURRENTEVENT',
                payload: {
                    status: 200,
                    data: {
                        eventId: 1,
                        eventName: "ganesh pandaga",
                        startDate: "12th October 2020",
                        endDate: "14th October 2020",
                        city: "San Jose",
                        state: "California",
                        country: "USA",
                        description: "pooja",
                        time: "12:00 am",
                        hashTags: "dasd,dwadw,qwdqd"
                    }
                }
            })
        }
        )
}

export const getAllRestaurants = (page, limit) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL + "/restaurants/?&page=" + page + "&limit=" + limit)
        .then(async res => {
            if (res.status === 200) {
                console.log(res);
                dispatch({
                    type: 'RESTAURANTS',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESTAURANTS',
                payload: {
                    status: 200,
                    data: [
                        {
                            restaurantId: 1,
                            restaurantName: "Paradise",
                            emailId: "paradise@gmail.com",
                            location: "San Jose, California",
                            description: "We sell good biryani",
                            contactNumber: "6693007583",
                            pictures: [],
                            timings: "10:00 am - 9:00 pm",
                            cuisines: "Indian, Asian",
                            modeOfDelivery: "Dine-in, pickup, Delivery",
                            averageRating: 4,
                            latitude: "",
                            longitude: "",
                        },
                        {
                            restaurantId: 2,
                            restaurantName: "Palamuru Grill",
                            emailId: "palamuru@gmail.com",
                            location: "San Jose, California",
                            description: "We sell spicy biryani",
                            contactNumber: "6693007583",
                            pictures: [],
                            timings: "10:00 am - 9:00 pm",
                            cuisines: "Indian, Asian",
                            modeOfDelivery: "dineIn, pickup, delivery",
                            averageRating: 3.5,
                            latitude: "",
                            longitude: "",
                        }
                    ]
                }
            })
        }
        )
}

export const getRestaurantById = (id) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL + "/restaurants/" + id)
        .then(async res => {
            console.log(res)

            if (res.status === 200) {
                dispatch({
                    type: 'CURRENTRESTAURANT',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'CURRENTRESTAURANT',
                payload: {
                    status: 200,
                    data: 
                        {
                            restaurantId: 1,
                            restaurantName: "paradise",
                            emailId: "paradise@gmail.com",
                            location: "San Jose, California",
                            description: "We sell good biryani",
                            contactNumber: "6693007583",
                            pictures: [],
                            timings: "10:00 am - 9:00 pm",
                            cuisines: "Indian, Asian",
                            modeOfDelivery: "Dine-in, pickup, Delivery",
                            averageRating: 4,
                            latitude: "",
                            longitude: "",
                            menu: [
                                {
                                    dishId: 1,
                                    dishName: "Chicken Biryani",
                                    mainIngredients: "Rice, Chicken",
                                    pictures: [],
                                    price: 15,
                                    description: "Chicken cooked with rice",
                                    dishCategory: "Main Course"
                                },
                                {
                                    dishId: 2,
                                    dishName: "Veg Manchurian",
                                    mainIngredients: "Carrots, Cabbage, Beans",
                                    pictures: [],
                                    price: 10,
                                    description: "Vegetables",
                                    dishCategory: "Starter"
                                }
                            ],
                            reviews: [
                                {
                                    date: "20th December 2020",
                                    rating: 3,
                                    review: "Its very spicy",
                                    user: {
                                        userId: 1,
                                        userName: "Kowshhal",
                                        profilePic: ""
                                    }
                                }
                            ],
                            events: [{
                                eventId: 1,
                                eventName: "ganesh pandaga",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "pooja",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            }]
                        }
                }
            })
        })
}

export const signup = (data) => async dispatch => {
    await axios.post(apiURL+ "/auth/signup/user", data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            console.log(res)

            if (res.status === 200) {
                dispatch({
                    type: 'SIGNUP',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
        )
}

export const profile = (data, userId) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.put(apiURL + "/users/" + userId, data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {

            if (res.status === 200) {
                dispatch({
                    type: 'PROFILE',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
        )
}

export const profileFetch = ( userId) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+ "/users/" + userId, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {

            if (res.status === 200) {
                dispatch({
                    type: 'PROFILEFETCH',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'PROFILEFETCH',
                payload: {
                    status: 200,
                    data: {
                        userId: 1,
                        firstName: "kowshhal",
                        lastName: "Uppu",
                        emailId: "kowshhal@gmail.com",
                        password: "qwerty",
                        dataOfBirth: "1234",
                        nickName: "kowshhal",
                        city: "San Jose",
                        state: "California",
                        country: "USA",
                        zipCode: "95110",
                        headLine: "hello world",
                        phoneNumber: "6693007583",
                        yelpingSince: "today",
                        thingsILove: "Games, Hiking, Eating, Reading",
                        findMeIn: " Instagram",
                        myWebsite: "hello.com",
                        Picture: "url",
                        favorites: "Biryani,Fried Chicken, Sandwich, Cake",
                        reviews: [
                            {
                                reviewId: 1,
                                date: "2nd October 2019",
                                rating: 4,
                                review: "It tastes good",
                                restaurant: {
                                    restaurantId: 1,
                                    restaurantName: "Paradise",
                                    location: "San Jose, CA",
                                }
                            },
                            {
                                reviewId: 2,
                                date: "20th December 2020",
                                rating: 3,
                                review: "Its very spicy",
                                restaurant: {
                                    restaurantId: 2,
                                    restaurantName: "Palamuru Grill",
                                    location: "San Jose, CA",
                                }
                            },
                        ],
                        events: [
                            {
                                eventId: 1,
                                eventName: "ganesh pandaga",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "pooja",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            }
                        ]

                    }
                }

            })
            
        }
        )
}

export const getUserProfile = ( userId) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL + "/users/" + userId, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {

            if (res.status === 200) {
                dispatch({
                    type: 'PROFILE',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'PROFILEFETCH',
                payload: {
                    status: 200,
                    data: {
                        userId: 1,
                        firstName: "kowshhal",
                        lastName: "Uppu",
                        emailId: "kowshhal@gmail.com",
                        password: "qwerty",
                        dataOfBirth: "1234",
                        nickName: "kowshhal",
                        city: "San Jose",
                        state: "California",
                        country: "USA",
                        zipCode: "95110",
                        headLine: "hello world",
                        phoneNumber: "6693007583",
                        yelpingSince: "today",
                        thingsILove: "Games, Hiking, Eating, Reading",
                        findMeIn: " Instagram",
                        myWebsite: "hello.com",
                        Picture: "url",
                        favorites: "Biryani,Fried Chicken, Sandwich, Cake",
                        reviews: [
                            {
                                reviewId: 1,
                                date: "2nd October 2019",
                                rating: 4,
                                review: "It tastes good",
                                restaurant: {
                                    restaurantId: 1,
                                    restaurantName: "Paradise",
                                    location: "San Jose, CA",
                                }
                            },
                            {
                                reviewId: 2,
                                date: "20th December 2020",
                                rating: 3,
                                review: "Its very spicy",
                                restaurant: {
                                    restaurantId: 2,
                                    restaurantName: "Palamuru Grill",
                                    location: "San Jose, CA",
                                }
                            },
                        ],
                        events: [
                            {
                                eventId: 1,
                                eventName: "ganesh pandaga",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "pooja",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd"
                            }
                        ]

                    }
                }

            })
            
        }
        )
}


export const reslogin = (data) => async dispatch => {
    await axios.post(apiURL + "/auth/login/restaurant", data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {

            if (res.status === 200) {
                dispatch({
                    type: 'RESLOGIN',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESLOGIN',
                payload: {
                    status: 200,
                    data: {
                        restaurantId: 1,
                        restaurantName: "paradise",
                        emailId: "kowshhal@gmail.com",
                        password: "qwerty",
                        location: "1234",
                        latitude: "kowshhal",
                        longitude: "San Jose",
                        description: "California",
                        contactNumber: "USA",
                        pictures: "url",
                        timings: "hello world",
                        cuisines: "6693007583",
                        modeOfDelivery: "today",
                        averageRating: "Games, Hiking, Eating, Reading",
                        menu: [
                            {
                                dishId: 1,
                                dishName: "dish1",
                                mainIngredients: "dish1",
                                pictures: "url",
                                price: "10$",
                                description: "dish1",
                                dishCategory: "dish1",
                            },
                            {
                                dishId: 2,
                                dishName: "dish2",
                                mainIngredients: "dish2",
                                pictures: "url",
                                price: "10$",
                                description: "dish2",
                                dishCategory: "dish2",
                            },
                        ],
                        events: [
                            {
                                eventId: 1,
                                eventName: "ganesh pandaga",
                                startDate: "12th October 2020",
                                endDate: "14th October 2020",
                                city: "San Jose",
                                state: "California",
                                country: "USA",
                                description: "pooja",
                                time: "12:00 am",
                                hashTags: "dasd,dwadw,qwdqd",
                                registeredUsers: [{
                                    userId: 1,
                                    userName: "kowshhal"
                                },
                                {
                                    userId: 1,
                                    userName: "Nivaliiiii"
                                }]
                            }
                        ]
                    }
                }

            })
        })
}

export const restaurantProfile = (data, restaurantId,restaurant) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.put(apiURL+ "/restaurants/" + restaurantId, data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            console.log(res)

            if (res.status === 200) {
                dispatch({
                    type: 'RESPROFILE',
                    payload: restaurant
                })

            } else {
                console.log(res)
            }
        }).catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESPROFILE',
                payload: {
                    status: 200,
                    data: {
                        restaurantId: 1,
                        restaurantName: "paradise",
                        emailId: "kowshhal@gmail.com",
                        password: "qwerty",
                        location: "1234",
                        latitude: "kowshhal",
                        longitude: "San Jose",
                        description: "California",
                        contactNumber: "USA",
                        pictures: "url",
                        timings: "hello world",
                        cuisines: "6693007583",
                        modeOfDelivery: "today",
                        averageRating: "Games, Hiking, Eating, Reading",
                        menu: [
                            {
                                dishId: 1,
                                dishName: "dish1",
                                mainIngredients: "dish1",
                                pictures: "url",
                                price: "10$",
                                description: "dish1",
                                dishCategory: "dish1",
                            },
                            {
                                dishId: 2,
                                dishName: "dish2",
                                mainIngredients: "dish2",
                                pictures: "url",
                                price: "10$",
                                description: "dish2",
                                dishCategory: "dish2",
                            },
                        ],
                    }
                }

            })
        })
}
export const ressignup = (data) => async dispatch => {
    await axios.post(apiURL + "/auth/signup/restaurant", data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            console.log(res)
            if (res.status === 200) {
                dispatch({
                    type: 'RESSIGNUP',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESSIGNUP',
                payload: {
                    status: 200,
                    data: [{
                        restaurantId: 1,
                        restaurantName: "paradise",
                        emailId: "kowshhal@gmail.com",
                        password: "qwerty",
                        location: "1234",
                        latitude: "kowshhal",
                        longitude: "San Jose",
                        description: "California",
                        contactNumber: "USA",
                        pictures: "url",
                        timings: "hello world",
                        cuisines: "6693007583",
                        modeOfDelivery: "today",
                        averageRating: "Games, Hiking, Eating, Reading",
                        menu: [
                            {
                                dishId: 1,
                                dishName: "dish1",
                                mainIngredients: "dish1",
                                pictures: "url",
                                price: "10$",
                                description: "dish1",
                                dishCategory: "dish1",
                            },
                            {
                                dishId: 2,
                                dishName: "dish2",
                                mainIngredients: "dish2",
                                pictures: "url",
                                price: "10$",
                                description: "dish2",
                                dishCategory: "dish2",
                            },
                        ],
                    }]
                }

            })
        })
}
export const getOrderById = (id, limit, page) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+"/orders/user/" + id + "?limit=" + limit + "?page=" + page, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'USERORDER',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'USERORDER',
                payload: {
                    status: 200,
                    data: [
                        {
                            orderId: 1,
                            restaurantName: "paradise",
                            orderDate: "12th October 2020",
                            orderStatus: "Received order",
                            orderTime: "7:00pm",
                            modeOfDelivery: "Delivery"
                        },
                        {
                            orderId: 2,
                            restaurantName: "Palamuru grill",
                            orderDate: "10th November 2020",
                            orderStatus: "Preparing",
                            orderTime: "2:00pm",
                            modeOfDelivery: "Pick up"
                        }
                    ]
                }
            })
        }
    )
}

export const getRestaurantOrdersById = (id, limit, page) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+"/orders/restaurant/" + id + "?limit=" + limit + "?page=" + page, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'RESTAURANTORDERS',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESTAURANTORDERS',
                payload: {
                    status: 200,
                    data: [
                        {
                            orderId: 1,
                            restaurantName: "paradise",
                            orderDate: "12th October 2020",
                            orderStatus: "Received order",
                            orderTime: "7:00pm",
                            modeOfDelivery: "Delivery"
                        },
                        {
                            orderId: 2,
                            restaurantName: "Palamuru grill",
                            orderDate: "10th November 2020",
                            orderStatus: "Preparing",
                            orderTime: "2:00pm",
                            modeOfDelivery: "Pick up"
                        }
                    ]
                }
            })
        }
    )
}

export const getRestaurantProfile = (id) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+ "/restaurants/" + id, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'RESPROFILE',
                    payload: res
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log('Fail');
            dispatch({
                type: 'RESPROFILE',
                payload: {
                    status: 200,
                    data: [
                        {
                            orderId: 1,
                            userName: "John",
                            orderDate: "12th October 2020",
                            orderStatus: "Received order",
                            orderTime: "7:00pm",
                            modeOfDelivery: "Delivery"
                        },
                        {
                            orderId: 2,
                            userName: "James",
                            orderDate: "10th November 2020",
                            orderStatus: "Preparing",
                            orderTime: "2:00pm",
                            modeOfDelivery: "Pick up"
                        }
                    ]
                }
            })
        }
    )
}

export const postReview = (userId,restaurantId,data) => async dispatch => {
    data.userId = userId;
    data.restaurantId = restaurantId;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(apiURL + "/reviews",data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
           return true
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const createOrder = (userId,data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    data.userId = userId;
    console.log(data)
    await axios.post(apiURL + "/orders/",data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            await profileFetch(userId)
           return true
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const updateOrder = (orderId,orderStatus,restaurant) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.put(apiURL + "/orders/" + orderId,{orderStatus:orderStatus}, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            dispatch({
                type: 'RESPROFILE',
                payload: restaurant
            })
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const addDish = (id,data,rest) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(apiURL+ "/menu/" + id + "/dish",data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'ADDDISH',
                    payload:rest
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const addEvent = (id, data,rest) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(apiURL + "/events/" , data, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'ADDEVENT',
                    payload:rest
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const registerForAnEvent = (eventId,userId,user) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    console.log(userId)
    await axios.post(apiURL+"/events/"+eventId + '/register_users', {userId:userId}, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(async res => {
            if (res.status === 200) {
                dispatch({
                    type: 'REGISTEREVENT',
                    payload:user
                })

            } else {
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err);
            console.log('Fail');
        }
    )
}

export const getMessagesofUser=(userId)=> async dispatch =>{
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+'/messages/user/'+userId)
      .then(response => {
          console.log("res:",response.data);
          dispatch({
            type: 'MESSAGELIST',
            payload: response.data.reverse()
        })
      }).catch(()=>{
          window.alert("Fail!")
      })

}

export const getMessagesOfRestaurant=(restaurantId)=> async dispatch =>{
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.get(apiURL+'/messages/restaurant/'+restaurantId)
    .then(response => {
        dispatch({
            type: 'MESSAGELIST',
            payload: response.data.reverse()
        })
    }).catch(()=>{
        window.alert("Fail!")
    })
}

export const postAMessage=(restaurantId,userId,message,messageList,sender)=>async dispatch =>{
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post(`${apiURL}/messages?userId=${userId}&sender=${sender}&restaurantId=${restaurantId}`,{message:message})
    .then(async res => {
        if (res.status === 200) {
            let newMessageList=[
                ...messageList
            ]
            for(let i=0; i<newMessageList.length;i++){
                if(newMessageList[i]._id===res.data._id){
                    newMessageList[i]=res.data
                }
            }
            dispatch({
                type: 'MESSAGELIST',
                payload: newMessageList
            })

        } else {
            console.log(res)
        }
    })
    .catch(err => {
        console.log(err);
        console.log('Fail');
    }
)
}

// export const uploadUserProfile = (data,userId) => async dispatch => {
//     await axios.post("http://localhost:3001/upload/profile" + userId)
//         .then(async res => {
            
//         })
//         .catch(err => {
//             console.log(err)
//         }
//     )
// }