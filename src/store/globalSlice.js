import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducer/testReducer'

export const store = configureStore({
    reducer: { testReducer },
})