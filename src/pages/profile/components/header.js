import React from 'react'
import Image from '../../../components/image'

export default function Header({ user }) {
    //console.log(user)
    return user && (
        <header className='flex items-center gap-x-24 py-8 pb-10'>
            <img  className="h-[150px] w-[150px] rounded-full" src={user.profileImage}></img>     
            <div>
                <div className='mb-4'>
                    <h1 className='text-[28px] font-normal'>{user.username}</h1>
                </div>
                <nav className='flex gap-x-6 items-center'>
                    <div><span className='font-semibold'>{user.posts}</span> posts</div>
                    <div><span className='font-semibold'>{user.followers.length}</span> followers</div>
                    <div><span className='font-semibold'>{user.following.length}</span> following</div>
                </nav>
            </div>
        </header>
    )
}
