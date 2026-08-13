import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slice/productSlice'
import BasketReducer from './slice/basketSlice'

export default configureStore({
    reducer: {
        product: ProductReducer,
        basket: BasketReducer
    }
})