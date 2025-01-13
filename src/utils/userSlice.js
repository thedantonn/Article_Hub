import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState: {
        userInfo: null,
    },

    reducers:{
        createUser:(state,action) => {
           state.userInfo = action.payload
        },
        removeUser: (state,action) => {
            state.userInfo = null
        }
    }
})
export const {createUser,removeUser} = userSlice.actions
export default userSlice.reducer