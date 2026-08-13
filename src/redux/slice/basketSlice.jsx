import { createSlice } from '@reduxjs/toolkit'

export const getDataFromStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'))
    }
    return []
}

const writeToStorageFromBasket = (data) => {
    localStorage.setItem('basket', JSON.stringify(data))
}

const initialState = {
    basketList: getDataFromStorage(),
    showAlert: false,
    isDrawerOpen: false
}

export const getTotalPriceByProduct = (product, count) => {
    return count * product.price
}

export const getTotalPriceForAllProducts = (basketList) => {
    return basketList.reduce((totalPrice, product) => {
        return totalPrice + product.totalPrice
    }, 0)
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket(state, action) {
            const findProduct = state.basketList.find((product) => product.id === action.payload.id)
            if (findProduct) {
                findProduct.count += action.payload.count
                findProduct.totalPrice = getTotalPriceByProduct(action.payload, findProduct.count)
            } else {
                state.basketList = [...state.basketList, action.payload]
            }
            writeToStorageFromBasket(state.basketList)
        },

        toggleDrawer(state) {
            state.isDrawerOpen = !state.isDrawerOpen
        },

        removeFromBasket(state, action) {
            state.basketList = state.basketList.filter((product) => product.id !== action.payload.id)
            state.showAlert = true
            writeToStorageFromBasket(state.basketList)
        },

        clearBasketList(state) {
            state.basketList = []
            writeToStorageFromBasket(state.basketList)
        },

        setShowALert(state, action) {
            state.showAlert = action.payload
        }
    }
})

export const { addToBasket, toggleDrawer, removeFromBasket, clearBasketList, setShowALert } = basketSlice.actions

export default basketSlice.reducer