import React from 'react'
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <div className='h-full w-full flex gap-x-8 items-center justify-center'>
        <Outlet/>
    </div>
  )
}
