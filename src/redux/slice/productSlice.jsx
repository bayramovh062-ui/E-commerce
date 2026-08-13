import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    isClick: true,
    searchInputValue: ''
}

const BASE_URL = 'https://fakestoreapi.com'

export const getAllProducts = createAsyncThunk('getallproducts', async () => {
    const response = await axios.get(`${BASE_URL}/products`)
    return response.data
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeTheme(state) {
            const root = document.getElementById('root')
            if (state.isClick) {
                root.style.backgroundColor = '#222222'
                root.style.color = 'white'
            } else {
                root.style.backgroundColor = 'white'
                root.style.color = 'black'
            }
            state.isClick = !state.isClick
        },

        setSearchInputValue(state, action) {
            state.searchInputValue = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
    }
})

export const { changeTheme, setSearchInputValue } = productSlice.actions

export default productSlice.reducer