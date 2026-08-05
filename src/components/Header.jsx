import React, { useState } from 'react'
import '../css/header.css'
import logo from '../images/logo.png'
import { TbBucket } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/slice/ProductSlice';
import { useNavigate } from 'react-router-dom';


function Header() {
    const { isClick } = useSelector((store) => { return store.product })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <div className='header flex-row space-items'>
                <div className='flex-row center-items'><img className='main-logo' onClick={() => { navigate('/') }} src={logo}></img><p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '17px', fontWeight: 'bolder' }}>HUSEYN A.S</p></div>
                <div className='flex-row'>
                    <input className='search-input' placeholder='search an item'></input>
                    <TbBucket className='icons' />
                    {isClick ? <FaMoon onClick={() => { dispatch(changeTheme()) }} className='icons' /> : <IoSunny className='icons' onClick={() => { dispatch(changeTheme()) }} />}
                </div>
            </div>
        </div>
    )
}

export default Header