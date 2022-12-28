import React, { useState } from 'react'
import Button from '../../components/Button.js'
import Icon from '../../components/icon.js'
import Modal from '../../components/modal.js'
export default function Inbox() {

  const [visibilty, setfirst] = useState()

  //console.log(visibilty);
  

  return (
    <>
      <div className='flex flex-col w-full space-y-4 items-center justify-center '>
        <div>
          <Icon size={96} name={'createmessage'}></Icon>

        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-light text-2xl text-gray-700'>Mesajların</h1>
          <p className='text-sm text-gray-400 font-light'>Bir arkadaşına veya gruba gizli fotoğraflar ve mesajlar gönder.</p>

        </div>
        
        <div className='px-4 '><Button onClick={()=>{
          setfirst(false);
        }}  >Mesaj Gönder</Button></div>
        <button type='button' onClick={()=>{
          setfirst(true);
        }} >test</button>
        


      </div>
      <div className='absolute'>
        <Modal isTrue={visibilty} ></Modal>
      </div>
    </>





  )
}
