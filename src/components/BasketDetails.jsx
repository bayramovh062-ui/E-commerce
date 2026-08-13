import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket } from '../redux/slice/basketSlice'


function BasketDetails({ product }) {

    const dispatch = useDispatch()
    return (
        <div>
            <div className='flex-row information-wrapper'>
                <img className='basket-image' src={product.image}></img>
                <div className="flex-column" style={{ marginLeft: '5px', marginRight: '5px' }}>
                    <h2 style={{ marginLeft: '7px', fontSize: 'bolder', fontFamily: 'Arial, Helvetica, sans-serif', width: '650px', height: '20px' }}>{product.title}</h2>
                    <div className='flex-row' style={{ height: '40px' }}><h3 className='price-text'>{product.price} ₺</h3><h3 style={{ marginLeft: '5px', fontFamily: 'Arial, Helvetica, sans-serif' }}>count: {product.count}</h3></div>
                    <div className='flex-row'><h3 style={{ marginLeft: '5px', fontFamily: 'Arial, Helvetica, sans-serif' }}>Total Price:</h3><h3 className='price-text' style={{ marginLeft: '7px', height: '15px' }}> {product.totalPrice} ₺</h3></div>
                    <button className='remove-button' onClick={() => {
                        dispatch(removeFromBasket(product))
                    }}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default BasketDetails
