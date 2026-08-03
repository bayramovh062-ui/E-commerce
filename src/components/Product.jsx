import React from 'react'
import '../css/products.css'
import { useSelector } from 'react-redux'
import { Backdrop } from '@mui/material';

function Product({ product }) {
  const { id, title, price, description, category, image, rating } = product
  const { isClick } = useSelector((store) => store.product)

  return (
    <div className={isClick ? 'card-white flex-column' : 'card-black flex-column'} >

      <img className='images' src={image} alt="product image" />

      <div className='text-box'>
        <p style={{ height: '60px' }}>{title}</p>
        <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>{price} ₺</p>
      </div>

      <div className='center-items flex-row'>
        <button className={isClick ? 'details-button-white' : 'details-button-black'}>See details</button></div>
    </div>

  )
}

export default Product