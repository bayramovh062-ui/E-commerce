import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../redux/slice/ProductSlice'
import '../css/productDetails.css'
import { Backdrop, CircularProgress } from '@mui/material';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Alert from '@mui/material/Alert';




function ProductDetails() {
    const { id } = useParams()
    const { products, loading } = useSelector((store) => { return store.product })
    const product = products && products.find((product) => { return product.id == id })
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const timeRef = useRef(null)

    useEffect(() => {
        if (products.length == 0) {
            dispatch(getAllProducts())
        }
    }, [])


    if (loading || !product) {
        return <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setShowAlert(true)

            if (timeRef.current) {
                clearTimeout(timeRef.current)
            }

            timeRef.current = setTimeout(() => {
                setShowAlert(false)
            }, 1500)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: "50px" }}>

            <img className='details-image' src={product.image}></img>
            <div style={{ marginLeft: '20px' }}>
                {showAlert && (
                    <Alert severity="error">
                        you can't use negative numbers for order
                    </Alert>
                )}
                <h1 className='margin-fix' style={{ color: 'rgb(183, 82, 82)' }}>{product.title}</h1>
                <h2 className='margin-fix' >{product.description}</h2>
                <h1 className='margin-fix' style={{ marginTop: '30px' }}>{product.price} ₺</h1>

                <div className='order-count flex-row'>
                    <CiCirclePlus className='order-icons' onClick={() => { increment() }} /><span style={{ fontWeight: '900', fontSize: 'x-large', fontFamily: 'Arial, Helvetica, sans-serif' }}>{count}</span><CiCircleMinus onClick={() => { decrement() }} className='order-icons' />
                </div>
                <button className='order-button'>Order</button>
            </div>
        </div >
    )
}

export default ProductDetails