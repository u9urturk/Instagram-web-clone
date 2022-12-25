import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import {AiFillCloseCircle} from 'react-icons/ai'
import classNames from 'classnames'
import Icon from './icon'

export default function Search() {

  const [open,setOpen] = useState(false)
  return (
    <div className='w-[268px] relative group '>
      <span className={classNames({
        'transition-all absolute pointer-events-none text-[#8e8e8e] w-9 h-9 flex items-center justify-center':true,
        'hidden':open
      })}>
        <Icon name="search" ></Icon>
      </span>
      <input placeholder='Search' onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)} type="text" className=' transition-all outline-none focus:pl-3 pl-9 h-9 rounded w-full bg-[#efefef]'></input>
      <span className={classNames({
        'absolute  text-[#c7c7c7] cursor-pointer hidden right-0 w-9 h-9 top-0 items-center justify-center':true,
        '!flex':open
      })}>
       <AiFillCloseCircle size={20}></AiFillCloseCircle>
      </span>

    </div>
  )
}
