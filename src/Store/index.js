const { createSlice, configureStore, current } = require("@reduxjs/toolkit")

const AuthInitialState = {
    isLoggedIn: false, 
    loggedInUser : {},
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
            state.items = state.items.map(item => {
                if(item.id === action.payload.id){
                    item.quantity++;
                    state.cartTotal = state.cartTotal + action.payload.cost
                }
                return item;
            })

        },
        decreaseQuantityOfItem : (state, action) => {
            const tempArr = state.items.map(item => {
                if(item.id === action.payload.id){
                    item.quantity--;
                    if(item.quantity <= 0) {
                        item = null
                    }
                    state.cartTotal = state.cartTotal - action.payload.cost
                }
                return item;
            })
            const finalArr = tempArr.filter(item => item!==null)
            state.items = finalArr;
        },
        clearCart : (state) => {
            state.items = []
            state.cartTotal = 0
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