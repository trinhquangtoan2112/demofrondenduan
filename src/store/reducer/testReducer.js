import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    number: 1
}

const testReducer = createSlice({
    name: "testReducer",
    initialState,
    reducers: {}
});

export const { } = testReducer.actions

export default testReducer.reducer 