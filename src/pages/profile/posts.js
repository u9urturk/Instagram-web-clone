import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

export default function ProfilePosts() {
  return (
    <div className='mt-20'>
      <div className='flex flex-col space-y-4  items-center justify-center'>
        <div className='border-[3px] rounded-full text-gray-800 border-black p-[9px]'><AiOutlineCamera size={36}></AiOutlineCamera></div>
        <h1 className='text-2xl tracking-widest font-light'>
          No Posts Yet
        </h1>
      </div>

    </div>
  )
}
