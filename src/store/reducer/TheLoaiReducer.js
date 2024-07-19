import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theLoai: []
}

const TheLoaiReducer = createSlice({
    name: "TheLoaiReducer",
    initialState,
    reducers: {
        getDanhSachTheLoai: (state, action) => {
            console.log(action)
            state.theLoai = action.payload
            console.log(state.theLoai)
        }
    }
});

export const { getDanhSachTheLoai } = TheLoaiReducer.actions

export default TheLoaiReducer.reducer