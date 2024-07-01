import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducer/testReducer'
import UserReducer from './reducer/UserReducer'

export const store = configureStore({
    reducer: { testReducer, UserReducer },
})