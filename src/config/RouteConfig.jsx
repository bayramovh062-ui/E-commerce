import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ProductDetails from '../components/ProductDetails'

function RouteConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/product-details/:id' element={<ProductDetails />}></Route>
            </Routes>
        </div>
    )
}

export default RouteConfig