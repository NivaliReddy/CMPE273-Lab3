const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require('graphql');

const getOrdersByRestaurantId = require('./QueryResolvers/getOrdersByRestaurantId');
const getMenuByRestaurantId = require('./QueryResolvers/getMenuByRestaurantId');
const getAllRestaurants = require('./QueryResolvers/getAllRestaurants');
const getRestaurantById = require('./QueryResolvers/getRestaurantById');
const getRestaurantsByName = require('./QueryResolvers/getRestaurantByName');
const getRestaurantsByLocation = require('./QueryResolvers/getRestaurantsByLocation');
const getUserById = require('./QueryResolvers/getUserById');

const addDish = require('./mutations/addDish');
const placeOrder = require('./mutations/placeOrder');
const restaurantLogin = require('./mutations/restaurantLogin');
const userLogin = require('./mutations/userLogin');
const updateOrderStatus = require('./mutations/updateOrderStatus');
const updateRestaurantById = require('./mutations/updateRestaurantById');
const updateUserById = require('./mutations/updateUserById');

const User = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        dateOfBirth: {
            type: GraphQLString
        },
        nickName: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        zipCode: {
            type: GraphQLString
        },
        headLine: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        yelpingSince: {
            type: GraphQLString
        },
        thingsILove: {
            type: GraphQLString
        },
        findMeIn: {
            type: GraphQLString
        },
        myWebsite: {
            type: GraphQLString
        },
        picture: {
            type: GraphQLString
        },
        favorites: {
            type: GraphQLString
        },
        reviews: {
            type: new GraphQLList(Review),
            description: "All reviews given by the user"
        },
        events: {
            type: new GraphQLList(Event),
            description: "All events registered by the user"
        },
        orders: {
            type: new GraphQLList(Order),
            description: "All orders placed by the user"
        }
    })
});

const Restaurant = new GraphQLObjectType({
    name: "restaurant",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        restaurantName: {
            type: GraphQLString
        },
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        latitude: {
            type: GraphQLString
        },
        longitude: {
            type: GraphQLString
        },
        pictures: {
            type: GraphQLString
        },
        timings: {
            type: GraphQLString
        },
        cuisines: {
            type: GraphQLString
        },
        modeOfDelivery: {
            type: GraphQLString
        },
        averageRating: {
            type: GraphQLString
        },
        menu: {
            type: new GraphQLList(Menu),
            description: "Dishes in the restaurant"
        },
        reviews: {
            type: new GraphQLList(Review),
            description: "All reviews given for the restaurant"
        },
        events: {
            type: new GraphQLList(Event),
            description: "All events hosted by the restaurant"
        },
        orders: {
            type: new GraphQLList(Order),
            description: "All orders placed in the restaurant"
        }
    })
});

const Review = new GraphQLObjectType({
    name: "review",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        rating: {
            type: GraphQLString
        },
        review: {
            type: GraphQLString
        }
    })
});

const Event = new GraphQLObjectType({
    name: "event",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        eventName: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        time: {
            type: GraphQLString
        },
        hashTags: {
            type: GraphQLString
        }
    })
});

const Order = new GraphQLObjectType({
    name: "order",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        orderDate: {
            type: GraphQLString
        },
        orderStatus: {
            type: GraphQLString
        },
        orderTime: {
            type: GraphQLString
        },
        modeOfDelivery: {
            type: GraphQLString
        }
    })
});

const Menu = new GraphQLObjectType({
    name: "menu",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        dishName: {
            type: GraphQLString
        },
        mainIngredients: {
            type: GraphQLString
        },
        pictures: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        dishCategory: {
            type: GraphQLString
        },
        restaurantId: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Root Query",
    fields: () => ({
        user: {
            type: User,
            description: "Get User details by user Id",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getUserById(args.id);
            }
        },
        restaurants: {
            type: new GraphQLList(Restaurant),
            description: "Get all Restaurants",
            resolve: () => {
                return getAllRestaurants();
            }
        },
        restaurant: {
            type: Restaurant,
            description: "Get Restaurant details By Restaurant Id",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getRestaurantById(args.id);
            }
        },
        restaurantsByName: {
            type: new GraphQLList(Restaurant),
            description: "Get Restaurant details By Restaurant Name",
            args: {
                restaurantName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getRestaurantsByName(args.restaurantName);
            }
        },
        restaurantsByLocation: {
            type: new GraphQLList(Restaurant),
            description: "Get Restaurants By Location",
            args: {
                location: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getRestaurantsByLocation(args.location);
            }
        },
        dishes: {
            type: new GraphQLList(Menu),
            description: "Get dishes of a restaurant by restaurantId",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getMenuByRestaurantId(args.id);
            }
        },
        orders: {
            type: new GraphQLList(Order),
            description: "Get orders of a restaurant by restaurantId",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return getOrdersByRestaurantId(args.id);
            }
        }
    })
});

const UserInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        dateOfBirth: {
            type: GraphQLString
        },
        nickName: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        zipCode: {
            type: GraphQLString
        },
        headLine: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        yelpingSince: {
            type: GraphQLString
        },
        thingsILove: {
            type: GraphQLString
        },
        findMeIn: {
            type: GraphQLString
        },
        myWebsite: {
            type: GraphQLString
        },
        picture: {
            type: GraphQLString
        },
        favorites: {
            type: GraphQLString
        },
        reviews: {
            type: new GraphQLList(ReviewInputType),
            description: "All reviews given by the user"
        },
        events: {
            type: new GraphQLList(EventInputType),
            description: "All events registered by the user"
        },
        orders: {
            type: new GraphQLList(OrderInputType),
            description: "All orders placed by the user"
        }
    })
});

const RestaurantInputType = new GraphQLInputObjectType({
    name: "Restaurant",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        restaurantName: {
            type: GraphQLString
        },
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contactNumber: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        latitude: {
            type: GraphQLString
        },
        longitude: {
            type: GraphQLString
        },
        pictures: {
            type: GraphQLString
        },
        timings: {
            type: GraphQLString
        },
        cuisines: {
            type: GraphQLString
        },
        modeOfDelivery: {
            type: GraphQLString
        },
        averageRating: {
            type: GraphQLString
        },
        menu: {
            type: new GraphQLList(MenuInputType),
            description: "Dishes in the restaurant"
        },
        reviews: {
            type: new GraphQLList(ReviewInputType),
            description: "All reviews given for the restaurant"
        },
        events: {
            type: new GraphQLList(EventInputType),
            description: "All events hosted by the restaurant"
        },
        orders: {
            type: new GraphQLList(OrderInputType),
            description: "All orders placed in the restaurant"
        }
    })
});

const MenuInputType = new GraphQLInputObjectType({
    name: "Menu",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        dishName: {
            type: GraphQLString
        },
        mainIngredients: {
            type: GraphQLString
        },
        pictures: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        dishCategory: {
            type: GraphQLString
        },
        restaurantId: {
            type: RestaurantInputType
        }
    })
});

const OrderInputType = new GraphQLInputObjectType({
    name: "Order",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        orderDate: {
            type: GraphQLString
        },
        orderStatus: {
            type: GraphQLString
        },
        orderTime: {
            type: GraphQLString
        },
        modeOfDelivery: {
            type: GraphQLString
        },
        userId: {
            type: UserInputType
        },
        restaurantId: {
            type: RestaurantInputType
        }
    })
});

const EventInputType = new GraphQLInputObjectType({
    name: "Event",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        eventName: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        time: {
            type: GraphQLString
        },
        hashTags: {
            type: GraphQLString
        }
    })
});

const ReviewInputType = new GraphQLInputObjectType({
    name: "Review",
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        rating: {
            type: GraphQLString
        },
        review: {
            type: GraphQLString
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        userLogin: {
            type: User,
            description: "User Login",
            args: {
                userDetails: {
                    type: UserInputType
                }
            },
            resolve: (parent, args) => {
                return userLogin(args.userDetails);
            }
        },
        restaurantLogin: {
            type: User,
            description: "Restaurant Login",
            args: {
                restaurantDetails: {
                    type: RestaurantInputType
                }
            },
            resolve: (parent, args) => {
                return restaurantLogin(args.restaurantDetails);
            }
        },
        updateUserProfile: {
            type: User,
            description: "Update User Profile",
            args: {
                user: {
                    type: new GraphQLNonNull(UserInputType)
                }
            },
            resolve: (parent, args) => {
                return updateUserById(args.user);
            }
        },
        updateRestaurantProfile: {
            type: Restaurant,
            description: "Update Restaurant Profile",
            args: {
                restaurant: {
                    type: new GraphQLNonNull(RestaurantInputType)
                }
            },
            resolve: (parent, args) => {
                return updateRestaurantById(args.restaurant);
            }
        },
        addDish: {
            type: Menu,
            description: "Add dish",
            args: {
                menu: {
                    type: new GraphQLNonNull(MenuInputType)
                }
            },
            resolve: (parent, args) => {
                return addDish(args.menu);
            }
        },
        placeOrder: {
            type: Order,
            description: "Place an order",
            args: {
                order: {
                    type: new GraphQLNonNull(OrderInputType)
                }
            },
            resolve: (parent, args) => {
                return placeOrder(args.order);
            }
        },
        updateOrderStatus: {
            type: Order,
            description: "Update Order Status",
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                orderStatus: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateOrderStatus(args.id, args.orderStatus);
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;