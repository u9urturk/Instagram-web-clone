import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../firebase.js'
import Search from './Search'

export default function Header() {
    return (
        <header className='bg-white border-b border-gray-300 '>
            <div className='flex items-center justify-between h-[60px] container mx-auto  '>

                <Link to="/">
                    <img className='h-[29px]' alt='' src={require('../assets/logo1.png')}></img>
                </Link>


                <Search></Search>


                <nav>
                    <button onClick={logout}>Logout</button>
                </nav>

            </div>
        </header>
    )
}
