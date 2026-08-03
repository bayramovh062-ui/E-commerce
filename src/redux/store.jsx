import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slice/ProductSlice'

export default configureStore({
    reducer: {
        product: ProductReducer,
    }
})