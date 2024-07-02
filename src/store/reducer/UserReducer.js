import { createSlice } from '@reduxjs/toolkit'
let user1 = false;
let user2 = false;
if (localStorage.getItem("USER_LOGIN")) {
    user1 = JSON.parse(localStorage.getItem("USER_LOGIN"));
    user2 = true
}
const initialState = {
    auth: {
        active: false,
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
        },
        logOutFromAccount: (state, action) => {
            state.userInfo = {}
            state.user = false
        },
        closeButton: (state, action) => {
            state.auth.active = false;
        },
        hienDangNhap: (state, action) => {
            console.log("2241421")
            state.auth.active = true;
            state.auth.login = true;
        },
        hienDangKy: (state, action) => {
            state.auth.active = true;
            state.auth.login = false;
        }

    }
});

export const { setUserInformation, logOutFromAccount, closeButton, hienDangNhap, hienDangKy } = UserReducer.actions

export default UserReducer.reducer