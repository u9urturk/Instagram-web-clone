import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../firebase.js'

export default function Logout() {
    logout()
    useNavigate("/auth/login",{
        replace:true
    })
    
  return (
    <div>

    </div>
  )
}
