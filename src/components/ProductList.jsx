import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slice/productSlice'
import Product from './Product'
import { Backdrop, CircularProgress } from '@mui/material';

function ProductList() {
    const dispatch = useDispatch()
    const { products, loading } = useSelector((store) => { return store.product })
    const { searchInputValue } = useSelector((store) => { return store.product })
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='flex-row all-products'>
                {products && products.filter((product) => product.title.toLowerCase().includes(searchInputValue.toLowerCase())).map((product) => {
                    return <Product key={product.id} product={product} />
                })}
            </div>
        </div>
    )
}

export default ProductList