import React from 'react'
import Icon from '../../../components/icon'
export default function Header({user}) {
  return (
    <div className='flex relative gap-x-2 border-b border-gray-300 w-full h-[60px] text-base font-semibold items-center justify-center'>
       <button >{user}</button>
       <button className='rotate-180'> <Icon name={'arrow'} size={20}></Icon></button>
       <button className='absolute right-3'> <Icon name={"newmessage" }size={25}></Icon></button>
    </div>
  )
}
