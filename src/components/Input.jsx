import React, { useEffect, useRef, useState } from 'react'

export default function Input({ label,type = "text", ...props }) {

    const inputRef = useRef()
    const [show,setShow] = useState(false);
    const[ inputType , setType]  = useState(type)

    useEffect(()=>{
        if(show){
            setType('text')
            inputRef.current.focus()
        }else if(type == "password"){
            setType('password')
            inputRef.current.focus()

        }
    },[show])

    return (
        <label className='block relative flex border rounden-sm focus-within:border-gray-400  '>
            <input  ref={inputRef} required={true}  type={inputType} className='w-full  bg-zinc-50  px-2 text-xs outline-none  h-[38px] peer valid:pt-[10px]' {...props}></input>
            <small className='absolute top-4 left-[10px] text-xs cursor-text pointer-events-none text-gray-400 -translate-y-1/2 transition-all peer-valid:text-[10px] peer-valid:pb-[10px]'>{label}</small>
            {type=="password" && props?.value &&(
                <button type="button" onClick={() => setShow(show => !show)} className=' h-full flex items-center text-sm font-semibold pr-2'>
                    {show ? 'Hide' : 'Show'}
                </button>      
            )}
        </label>
    )
}
