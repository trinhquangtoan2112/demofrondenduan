import { createSlice } from '@reduxjs/toolkit'
let user1 = {};
let user2 = false;
if (localStorage.getItem("USER_LOGIN")) {
    user1 = JSON.parse(localStorage.getItem("USER_LOGIN"));
    user2 = true
}
const initialState = {
    auth: {
        active: true,
        login: true
    },
    user: user2,
    userInfo: user1,

}

const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
        setUserInformation: (state, action) => {
            state.userInfo = action.payload.data
            state.user = true

            console.log(action)
        }

    }
});

export const { setUserInformation } = UserReducer.actions

export default UserReducer.reducer