const { createSlice, configureStore } = require("@reduxjs/toolkit")

const AuthInitialState = {
    isLoggedIn: false, 
    loggedInUser : [],
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState: AuthInitialState,
    reducers : {
        loginUser : (state, action) => {
            console.log("Action Payload", action.payload)
            state.loggedInUser = action.payload;
            
        },
        logout : (state) => {
            state.loggedInUser = {};
            state.isLoggedIn = false;
        }

    }
})

export const authActions = AuthSlice.actions;
const store = configureStore({
    reducer:{Auth: AuthSlice.reducer}
})
export default store;