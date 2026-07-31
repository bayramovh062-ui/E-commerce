import React, { useState } from 'react'
import '../css/header.css'
import logo from '../images/logo.png'
import { TbBucket } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";


function Header() {
    const [isClick, setIsClick] = useState(true)

    const changeTheme = () => {
        const root = document.getElementById('root')
        if (isClick) {
            root.style.backgroundColor = 'black'
            root.style.color = 'white'
        } else {
            root.style.backgroundColor = 'white'
            root.style.color = 'black'
        }
        setIsClick(!isClick)
    }
    return (
        <div>
            <div className='header flex-row space-items'>
                <div className='flex-row center-items'><img className='main-logo' src={logo}></img><p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '17px', fontWeight: 'bolder' }}>HUSEYN A.S</p></div>
                <div className='flex-row'>
                    <input className='search-input' placeholder='search an item'></input>
                    <TbBucket className='icons' />
                    {isClick ? <FaMoon onClick={() => { changeTheme() }} className='icons' /> : <IoSunny className='icons' onClick={() => { changeTheme() }} />}
                </div>
            </div>
        </div>
    )
}

export default Header