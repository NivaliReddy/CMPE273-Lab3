const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = require('graphql');

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

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Root Query",
    fields: () => ({
        user: {
            type: User,
            description: "Get User details by user Id",
            args: {
                id: new GraphQLNonNull(GraphQLString)
            },
            resolve: () => {
                return getUserByUserId();
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
                id: new GraphQLNonNull(GraphQLString)
            },
            resolve: () => {
                return getRestaurantById(args.id);
            }
        },
        dishes: {
            type: Menu,
            description: "Get dishes of a restaurant by restaurantId",
            args: {
                id: new GraphQLNonNull(GraphQLString)
            },
            resolve: () => {
                return getMenuByRestaurantId(args.id);
            }
        },
        orders: {
            type: Order,
            description: "Get orders of a restaurant by restaurantId",
            args: {
                id: new GraphQLNonNull(GraphQLString)
            },
            resolve: () => {
                return getOrderByRestaurantId(args.id);
            }
        }

    })
});

const UserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: () => ({
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

const RestaurantInput = new GraphQLInputObjectType({
    name: "RestaurantInput",
    fields: () => ({
        emailId: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

const UserProfileInputType = new GraphQLInputObjectType({
    name: "UserProfileInput",
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
        }
    })
});

const RestaurantProfileInputType = new GraphQLInputObjectType({
    type: "Restaurant",
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
        }
    })
});

const AddDishInputType = new GraphQLInputObjectType({
    type: "Menu",
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

const PlaceOrderInputType = new GraphQLInputObjectType({
    type: "Order",
    fields: () => ({
        _id: {
            type: String
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

const UpdateDeliveryStatusOfOrderInputType = new GraphQLInputObjectType({
    type: "Order",
    fields: () => ({
        _id: {
            type: String
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
})

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        userLogin: {
            type: User,
            description: "User Login",
            args: {
                userDetails: {
                    type: new GraphQLNonNull(GraphQLString)
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
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return userLogin(args.restaurantDetails);
            }
        },
        updateUserProfile: {
            type: User,
            description: "Update User Profile",
            args: {
                user: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateUserById(args.id, args.user);
            }
        },
        updateRestaurantProfile: {
            type: Restaurant,
            description: "Update Restaurant Profile",
            args: {
                restaurant: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateRestaurantById(args.id, args.restaurant);
            }
        },
        addDish: {
            type: Menu,
            description: "Add dish",
            args: {
                menu: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return addDish(args.id, args.menu);
            }
        },
        placeOrder: {
            type: Order,
            description: "Place an order",
            args: {
                order: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return placeOrder(args.id, args.order);
            }
        },
        updateOrderStatus: {
            type: Order,
            description: "Update Order Status",
            args: {
                order: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                return updateOrderStatus(args.id, args.order);
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    //mutation: RootMutationType
});

module.exports = schema;