import { createSlice } from '@reduxjs/toolkit'
let fontSize = 18;
let fontStyle = "Arial";
if (localStorage.getItem("Fontsize")) {
    fontSize = localStorage.getItem("Fontsize");

}
if (localStorage.getItem("FontStyle")) {

    fontStyle = localStorage.getItem("FontStyle")

}
const initialState = {
    allFontKieuChu: [
        { name: "Arial", style: 'Arial' },
        { name: "Courier New", style: 'Courier New ' },
        { name: "Georgia", style: 'Georgia' },
        { name: "Times New Roman", style: 'Times New Roman' },
        { name: "Verdana", style: 'Verdana' }
    ],
    fontChu: fontSize,
    fontStyle: fontStyle,
    nenToi: false
}

const TienIchReducer = createSlice({
    name: "TienIchReducer",
    initialState,
    reducers: {
        setFormChu: (state, action) => {

            state.fontChu = action.payload
            localStorage.setItem("Fontsize", action.payload)
        },
        setFontStyle: (state, action) => {

            state.fontStyle = action.payload
            localStorage.setItem("FontStyle", action.payload)
        },
        setTheme: (state, action) => {
            state.nenToi = !state.nenToi
        }
    }
});

export const { setFormChu, setFontStyle, setTheme } = TienIchReducer.actions

export default TienIchReducer.reducer