import React from 'react'

export default function Separator({label='OR'}) {
    return (
        <div className='flex items-center'>
            <div className='h-px bg-gray-300 flex-1'></div>
            <span className='px-4 text-xs'>{label}</span>
            <div className='h-px bg-gray-300 flex-1'></div>
        </div>
    )
}
