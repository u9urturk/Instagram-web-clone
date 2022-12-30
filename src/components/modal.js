import classNames from 'classnames';
import React, { useState } from 'react'
import Icon from './icon';
import Image from './image';

export default function Modal({ isVisible = false, onClose }) {

    const users = [
        {
            id: 1,
            url: "pf1.jpg",
            name: "Tomris",
            fullNamse: "tomris.ugur"
        },
        {
            id: 2,
            url: "pf2.jpg",
            name: "Merve",
            fullNamse: "merve.d3n3m3"
        },
        {
            id: 3,
            url: "pf3.jpg",
            name: "Selin",
            fullNamse: "selin.d3n3m3"
        },
        {
            id: 4,
            url: "pf1.jpg",
            name: "Tomris",
            fullNamse: "tomris.ugur"
        },
        {
            id: 5,
            url: "pf2.jpg",
            name: "Merve",
            fullNamse: "merve.d3n3m3"
        },
        {
            id: 6,
            url: "pf3.jpg",
            name: "Selin",
            fullNamse: "selin.d3n3m3"
        },
        {
            id: 7,
            url: "pf1.jpg",
            name: "Tomris",
            fullNamse: "tomris.ugur"
        },
        {
            id: 8,
            url: "pf2.jpg",
            name: "Merve",
            fullNamse: "merve.d3n3m3"
        },
        {
            id: 9,
            url: "pf3.jpg",
            name: "Selin",
            fullNamse: "selin.d3n3m3"
        },

    ]

    const[deneme , setDeneme] = useState("")


    const test = (fullName)=>{
        
    }

    console.log()
    
    



    if (isVisible === false) {
        return;
    }
    return (
        <div className='fixed inset-0 transition-shadow bg-black bg-opacity-30 backdrop-blur-[2px]
        flex items-center justify-center'>

            <div className='h-[467px] w-[400px]  shadow-slate-700 shadow-2xl bg-white rounded-2xl'>
                {/* MODAL HEADER*/}
                <div className="flex items-center justify-between px-5 border-b h-14 w-full border-gray-300 ">
                    <div onClick={onClose} className='cursor-pointer'> <Icon name={"cancel"}></Icon></div>
                    <h6 className='text-lg font-semibold'>New Message</h6>
                    <a href='#' className='font-semibold text-base hover:text-black transition-all'>Forward</a>
                </div>
                {/*MODAL BODY*/}
                <div className='border-b overflow-y-auto max-h-[200px] flex-col gap-y-2 pt-2'>
                    <div className='px-2'><p className='font-semibold text-lg'>To who:</p></div>
                    <div><input placeholder='Search ...' className=' text-[15px] px-4 w-full h-[30px] outline-none'></input></div>
                </div>
                <div className='  flex-col gap-y-4 pt-2'>
                    <div className=' px-2 '><p className='font-semibold text-lg'>Recommended</p></div>
                    <div className='px-1 overflow-y-auto h-[290px]  '>
                        {users.map(user => (
                            <div key={user.id} className='px-6  pt-4 flex items-center justify-between'>
                                <div className='flex items-center gap-x-3'>
                                    <Image className="rounded-full w-[56px] h-[56px]" url={user.url} ></Image>
                                    <div>
                                        <h6 className='font-semibold'>{user.fullNamse}</h6>
                                        <p className='text-gray-500'>{user.name}</p>
                                    </div>
                                </div>

                                <div  onClick={()=>{test();}} 
                                className={classNames({
                                    'h-[24px] w-[24px] cursor-pointer  border-[2px] border-gray-700 rounded-full':true,
                                   

                                })}></div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}
