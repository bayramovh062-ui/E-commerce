import React, { useState } from 'react'
import '../css/header.css'
import logo from '../images/logo.png'
import { TbBucket } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, setSearchInputValue } from '../redux/slice/productSlice';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { toggleDrawer } from '../redux/slice/basketSlice';


function Header() {
    const { isClick, searchInputValue } = useSelector((store) => { return store.product })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { basketList, isDrawerOpen } = useSelector((store) => { return store.basket })

    return (
        <div>
            <div className='header flex-row space-items'>
                <div className='flex-row center-items'><img className='main-logo' onClick={() => { navigate('/') }} src={logo}></img><p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '17px', fontWeight: 'bolder' }}>HUSEYN H.B</p></div>
                <div className='flex-row'>
                    <input className='search-input' placeholder='search an item' onChange={(e) => {
                        dispatch(setSearchInputValue(e.target.value))
                    }} value={searchInputValue}></input>
                    <Badge style={{ marginRight: '9px', marginLeft: '3px' }}
                        badgeContent={basketList.length}
                        color="error"
                    >
                        <TbBucket className='icons' onClick={() => {
                            dispatch(toggleDrawer())
                        }} />
                    </Badge>
                    {isClick ? <FaMoon onClick={() => { dispatch(changeTheme()) }} className='icons' /> : <IoSunny className='icons' onClick={() => { dispatch(changeTheme()) }} />}
                </div>
            </div>
        </div>
    )
}

export default Header