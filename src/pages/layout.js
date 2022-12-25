import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Header></Header>
            <div className='container mx-auto pt-4'>
                <Outlet></Outlet>

            </div>
        </>
    )
}
