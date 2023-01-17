import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Icon from '../../components/icon'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../firebase'
import Messages from './components/messages'


export default function MessageBox() {
  const user = useSelector(state => state.auth.user)
  const messageboxid = useParams();
  const [member, setMember]=useState([])
  

  //console.log(messageboxid);
  const fetchInformation = async (messagebox) => {
    await messagebox.then(res => {
      let xmember = "";
      res.members.forEach(x => {
        if (x.userId == user.uid) {
          return;
        } else {
          xmember = x.userId.toString()
        }

        const getUserDetail = getUserDetailByUid(xmember);
        getUserDetail.then(t => {
          setMember(t);
          //console.log(member);
        })

      })
    })

    
  }
  useEffect(()=>{
    fetchInformation(getMessageboxByMessageSubscription(messageboxid.messageboxid)).finally(
    )
  },[messageboxid])

  //console.count(member)

  //console.log(member)

   return (
    <div className=''>
      {/* Header */}
      <div className='w-full h-[60px]  border-b border-gray-300'>
        <div className='px-10 h-full w-full flex items-center'>
          <div className='flex items-center justify-start gap-x-3  h-full w-full'>
            <div className='h-10 w-10 '><img className="rounded-full" src={member.profileImage}></img></div>
            <strong>{member.full_name}</strong>
          </div>
          <div className='cursor-pointer'>
            <Icon name={"info"} size={24}></Icon>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className='h-[440px]'>
        <Messages user={user} messageboxid={messageboxid} />
      </div>
      {/* Input */}
      <div className='w-full flex items-center justify-center h-[84px] '>
        <div className='h-[42px] border border-gray-300 rounded-l-full   rounded-r-full flex items-center  px-6 w-full max-w-[90%]'>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"ifade"} size={24}></Icon></div>
          <div className='w-[420px] '><input className='outline-none w-full' placeholder='Message...'></input></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"pictureadd"} size={24}></Icon></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center '><Icon name={"heart"} size={24}></Icon></div>
        </div>
      </div>
    </div>
  )
}
