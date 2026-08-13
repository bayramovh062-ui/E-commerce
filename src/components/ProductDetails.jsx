import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../redux/slice/productSlice'
import '../css/productDetails.css'
import { Backdrop, CircularProgress } from '@mui/material';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Alert from '@mui/material/Alert';
import { FaCartPlus } from "react-icons/fa";
import { addToBasket, getTotalPriceByProduct } from '../redux/slice/basketSlice'




function ProductDetails() {
    const { id } = useParams()
    const { products, loading } = useSelector((store) => { return store.product })
    const product = products && products.find((product) => { return product.id == id })
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [showCantBeZeroAlert, setShowCantBeZeroAlert] = useState(false)
    const [showAddCartMessage, setShowAddCartMessage] = useState(false)
    const timeRef = useRef(null)
    const { basketList } = useSelector((store) => store.basket)

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

    const makeRequest = () => {
        const { id, title, price, image } = product
        const totalPrice = getTotalPriceByProduct(product, count)
        return {
            id,
            title,
            price,
            image,
            count,
            totalPrice
        }
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
                {showCantBeZeroAlert && (
                    <Alert severity='error'>
                        Count can't be zero
                    </Alert>
                )}
                {showAddCartMessage && (
                    <Alert severity='success'>
                        item added to cart with successfully!
                    </Alert>
                )}

                <h1 className='margin-fix' style={{ color: 'rgb(183, 82, 82)' }}>{product.title}</h1>
                <h2 className='margin-fix' >{product.description}</h2>
                <h1 className='margin-fix' style={{ marginTop: '30px' }}>{product.price} ₺</h1>

                <div className='order-count flex-row'>
                    <CiCirclePlus className='order-icons' onClick={() => { increment() }} /><span style={{ fontWeight: '900', fontSize: 'x-large', fontFamily: 'Arial, Helvetica, sans-serif' }}>{count}</span><CiCircleMinus onClick={() => { decrement() }} className='order-icons' />
                </div>
                <div className='flex-row' style={{ alignItems: 'center' }}>
                    <button className='order-button' onClick={() => {
                        if (count === 0) {
                            setShowCantBeZeroAlert(true)

                            if (timeRef.current) {
                                clearTimeout(timeRef.current)
                            }

                            timeRef.current = setTimeout(() => {
                                setShowCantBeZeroAlert(false)
                            }, 1500);
                        } else {
                            dispatch(addToBasket(makeRequest()))
                            setShowAddCartMessage(true)
                            if (timeRef.current) {
                                clearTimeout(timeRef.current)
                            }

                            timeRef.current = setTimeout(() => {
                                setShowAddCartMessage(false)
                            }, 1500)
                        }

                    }}>Add to cart <FaCartPlus style={{ width: '30px', height: '20px' }} /></button>
                </div>
            </div>
        </div >
    )
}

export default ProductDetails