import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducer/testReducer'
import UserReducer from './reducer/UserReducer'
import TheLoaiReducer from './reducer/TheLoaiReducer'

export const store = configureStore({
    reducer: { testReducer, UserReducer, TheLoaiReducer },
})