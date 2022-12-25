import React from 'react'
import {IoLogoInstagram}from 'react-icons/io'
import Icon from '../../components/icon'
export default function ProfileTagged() {
  return (
    <div className='mt-20'>
       <div className='flex flex-col space-y-4  items-center justify-center'>
          <div className='border-[3px] rounded-full text-gray-800 border-black p-3'><Icon name={'tag'} size={30}></Icon></div>
          <h1 className='text-2xl tracking-widest font-light'>
               No photo
          </h1> 
        </div>
    </div>
  )
}
