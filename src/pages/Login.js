import React, { useEffect, useRef, useState } from 'react'
import {GrFacebook} from 'react-icons/gr';
import Input from '../components/Input';
import { useNavigate , useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth';
import { login } from '../firebase.js';

export default function Login() {
    
    const dispacth = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const ref = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const enable = username && password
    useEffect(() => {
      let images = ref.current.querySelectorAll('img'),
        total = images.length,
        current = 0
  
      const imageSlider = () => {
        images[(current > 0 ? current : total) - 1].classList.add('opacity-0')
        images[current].classList.remove('opacity-0')
        current = current === total -1 ? 0 : current + 1;
      }
  
      imageSlider()
      let interval = setInterval(imageSlider, 3000)
      return () => {
        clearInterval(interval)
      }
    }, [ref])

    const handleSubmit = async e => {
        e.preventDefault()
        await login(username,password)
        /*
        navigate(location.state?.return_url || '/' , {
            replace:true
        } )*/
    }
  
    return (
      <div className='h-full w-full flex gap-x-8 items-center justify-center'>
        <div className='hidden md:block w-[380px] h-[581px] bg-logo-patter relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]' >
          <div className='w-[250px] h-[538px] absolute top-[27px] right-[18px]' ref={ref}>
            <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/1.png')}></img>
            <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/2.png')}></img>
            <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/3.png')}></img>
            <img alt='' className=' w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear' src={require('../assets/4.png')}></img>
          </div>
        </div>
        <div className='grid gap-y-4'>
          <div className='w-[350px] bg-white grid gap-y-6 rounded  border px-[50px] pt-8 pb-2'>
            <a href='#' className='flex justify-center'>
              <img className='h-[51px]' src={require('../assets/logo1.png')} alt=''></img>
            </a>
            <form onSubmit={handleSubmit} className='grid gap-y-2'>
              <Input type="text" value={username} onChange={e => setUsername(e.target.value)} label="Phone number, username or email" />
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} label="Password" />
              <button disabled={!enable} type="submit" className='w-full h-[30px] disabled:opacity-40 rounded-md  bg-facebook  text-white font-semibold  '>Log in</button>
            </form>
           
            <div className='flex items-center'>
              <div className='h-px bg-gray-300 flex-1'></div>
              <span className='px-4 text-xs'>OR</span>
              <div className='h-px bg-gray-300 flex-1'></div>
            </div>
            <a href='#' className=' cursor-pointer flex justify-center items-center gap-x-2 text-sm font-semibold text-facebook'>
              <GrFacebook size={20} />
              Log in with Facebook
            </a>
            <a href='#' className=' cursor-pointer flex items-center justify-center text-xs text-gray-700'>
              Did you forget your password?
            </a>
          </div>
          <div className='w-full h-14 rounded  bg-white border flex items-center justify-center text-sm'>
              Don't have an a account?<a className='text-facebook font pl-2 cursor-pointer font-semibold'>Register</a>
          </div>
          <div className=' flex items-center justify-center text-sm'>
            Download the application.
            
          </div>
          <div className='flex justify-center items-center gap-x-2 cursor-pointer'>
            <img alt='' className='h-[40px] w-[130px]' src={require('../assets/googlelogo.png')}></img>
            <img alt='' className='h-[40px] w-[120px]' src={require('../assets/microsoftlogo.png')}></img>
          </div>
        </div>
      </div>
    );
}
