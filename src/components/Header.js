import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../firebase.js'
import Icon from './icon.js'
import Image from './image.js'
import Search from './Search'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

export default function Header() {

    const user = useSelector(state => state.auth.user)


    return (
        <header className='bg-white border-b border-gray-300 '>
            <div className='flex items-center justify-between h-[60px] container mx-auto  '>

                <Link to="/">
                    <Image className='h-[29px]' alt='' url={'logo1.png'}></Image>
                </Link>


                <Search></Search>

                <nav className='flex items-center  gap-x-4 '>
                    <NavLink to={`/`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })} >
                        <Icon  name="home"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/discover`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })}  >
                        <Icon name="discover"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/reels`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })} >
                        <Icon name="reels"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/direct/inbox`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })} >
                        <Icon name="message"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/heart`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })} >
                        <Icon name="heart"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/create`} end={true}  className={({isActive})=>classNames({
                        "":true,
                        "text-gray-600":!isActive,
                        "text-black":isActive
                    })} >
                        <Icon name="create"  size={20}></Icon>
                    </NavLink>
                    <NavLink to={`/${user.username}`} className="ml-2">
                         <Image className="rounded-full h-12 w-12" url={'pf1.jpg'}/>
                    </NavLink>
                </nav>
  
            </div>
        </header>
    )
}
