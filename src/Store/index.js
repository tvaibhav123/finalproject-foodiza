const { createSlice, configureStore } = require("@reduxjs/toolkit")

const AuthInitialState = {
    isLoggedIn: false, 
    loggedInUser : [],
}

const CartInitialState = {
    items:[],
    cartTotal: 0
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: AuthInitialState,
    reducers : {
        loginUser : (state, action) => {
            console.log("Action Payload", action.payload)
            state.loggedInUser = action.payload;
            state.isLoggedIn = true;
        },
        logout : (state) => {
            state.loggedInUser = {};
            state.isLoggedIn = false;
        }

    }
})
const CartSlice = createSlice({
    name: "Cart",
    initialState: CartInitialState,
    reducers : {
        addItemToCart : (state, action) => {
            state.items = [...state.items, action.payload]
            state.cartTotal = state.cartTotal + action.payload.cost
        },
        increaseQuantityOfItem : (state, action) => {
            
        },
        reduceItemFromCart : (state) => {
        }

    }
})

export const cartActions = CartSlice.actions;
export const authActions = AuthSlice.actions;

const store = configureStore({
    reducer:{
        Auth: AuthSlice.reducer,
        Cart: CartSlice.reducer
    }
})
export default store;