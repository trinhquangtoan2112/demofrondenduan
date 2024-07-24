import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allFontKieuChu: [
        { name: "Arial", style: 'Arial' },
        { name: "Courier New", style: 'Courier New ' },
        { name: "Georgia", style: 'Georgia' },
        { name: "Times New Roman", style: 'Times New Roman' },
        { name: "Verdana", style: 'Verdana' }
    ],
    fontChu: 18,
    fontStyle: "Arial"
}

const TienIchReducer = createSlice({
    name: "TienIchReducer",
    initialState,
    reducers: {
        setFormChu: (state, action) => {

            state.fontChu = action.payload

        },
        setFontStyle: (state, action) => {

            state.fontStyle = action.payload

        },
    }
});

export const { setFormChu, setFontStyle } = TienIchReducer.actions

export default TienIchReducer.reducer