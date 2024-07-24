import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducer/testReducer'
import UserReducer from './reducer/UserReducer'
import TheLoaiReducer from './reducer/TheLoaiReducer'
import TienIchReducer from './reducer/TienIchReducer'
export const store = configureStore({
    reducer: { testReducer, UserReducer, TheLoaiReducer, TienIchReducer },
})