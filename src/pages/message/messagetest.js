import React from 'react'
import { useSelector } from 'react-redux'
import Icon from '../../components/icon'
import Image from '../../components/image'


export default function MessageTest() {
  const user = useSelector(state => state.auth.user)
  //console.log(user)

 
  return (
    <div className=''>
      {/* Header */}
      <div className='w-full h-[60px]  border-b border-gray-300'>
        <div className='px-10 h-full w-full flex items-center'>
          <div className='flex items-center justify-start gap-x-3  h-full w-full'>
            <div className='h-8 w-8 '><Image className="rounded-full" url={"pf3.jpg"}></Image></div>
            <strong>{user.fullName}</strong>
          </div>
          <div className='cursor-pointer'>
            <Icon name={"info"} size={24}></Icon>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className='h-[440px]'>
        MESAJLAR
      </div>
      {/* Input */}
      <div className='w-full flex items-center h-[84px] '>
        <div className='h-[42px] border border-gray-300 rounded-l-full rounded-r-full flex items-center mx-5 px-4 w-full'>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"ifade"} size={24}></Icon></div>
          <div className='w-[420px] '><input className='outline-none w-full' placeholder='Message...'></input></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"pictureadd"} size={24}></Icon></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center '><Icon name={"heart"} size={24}></Icon></div>
        </div>
      </div>
    </div>
  )
}
