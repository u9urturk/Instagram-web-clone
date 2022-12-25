import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../firebase.js'
import Icon from './icon.js'
import Image from './image.js'
import Search from './Search'

export default function Header() {
    return (
        <header className='bg-white border-b border-gray-300 '>
            <div className='flex items-center justify-between h-[60px] container mx-auto  '>

                <Link to="/">
                    <Image className='h-[29px]' alt='' url={'logo1.png'}></Image>
                </Link>


                <Search></Search>

                <nav className='flex items-center gap-x-4 text-gray-800'>
                    <button >
                        <Icon name="home"  size={20}></Icon>
                    </button>
                    <button>
                        <Icon name="discover"  size={20}></Icon>
                    </button>
                    <button>
                        <Icon name="reels"  size={20}></Icon>
                    </button>
                    <button>
                        <Icon name="message"  size={20}></Icon>
                    </button>
                    <button>
                        <Icon name="heart"  size={20}></Icon>
                    </button>
                    <button>
                        <Icon name="create"  size={20}></Icon>
                    </button>
                    <button onClick={logout}>
                        <div className='h-10 w-10 ml-2'>
                            <Image url={'baseProfileImage.jpg'}/>
                        </div>
                    </button>
                </nav>
  
            </div>
        </header>
    )
}
