import React from 'react'

export default function Button({type = 'button' ,children, ...props}) {
    return (
        <button type={type}
            {...props} 
            className='w-full h-[30px] flex items-center justify-center gap-x-2 disabled:opacity-40 rounded-md  bg-facebook 
            text-white font-semibold  '>
           {children}
        </button>
    )
}
