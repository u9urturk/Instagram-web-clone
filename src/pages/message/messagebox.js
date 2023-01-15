import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Icon from '../../components/icon'
import Image from '../../components/image'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../firebase'


export default function MessageBox() {
  const user = useSelector(state => state.auth.user)
  const messageboxid = useParams();
  const result = getMessageboxByMessageSubscription(messageboxid.messageboxid)
  const [member, setMember] = useState("");
  const [messages, setMessages] = useState();


  const fetchInformation = () => {
    result.then(res => {
      let member = "";
      res.members.forEach(x => {
        if (x.userId == user.uid) {
          return;
        } else {
          member = x.userId.toString()
        }

        const getUserDetail = getUserDetailByUid(member);
        getUserDetail.then(t => {
          setMember(t);
        })

      })
    })
  }

  const fetchMessages = async () => {
    let messages = []
    await  result.then(res => {
      res.messages.forEach(el => {
        const owner = getUserDetailByUid(el.owner);
        owner.then(ownerres => {
          // console.log(ownerres.profileImage)
          let message = {
            profileImage: ownerres.profileImage,
            message: el.message,
            time: el.time
          }

          messages.push(message)

        })
      })
    })
    setMessages(messages);
    
  }

  

  useEffect(() => {
    fetchInformation()
   
   
  }, [messageboxid])

  useEffect(()=>{
    fetchMessages()
  },[messageboxid])

  console.log(member);

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
       {
         messages?.map(res=>{
          <div  className='w-full h-auto'>
              <div className="bg-gray-500 rounded-lg">
                   <p>{res.message}</p>   
              </div>
          </div>
        })
          
       }
      </div>
      {/* Input */}
      <div className='w-full flex items-center h-[84px] '>
        <div className='h-[42px] border border-gray-300 rounded-l-full rounded-r-full flex items-center mx-5 px-4 w-full'>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"ifade"} size={24}></Icon></div>
          <div className='w-[420px] '><input className='outline-none w-full' placeholder='Message...'></input></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"pictureadd"} size={24}></Icon></div>
          <div className='w-[40px] cursor-pointer flex items-center justify-center '><Icon name={"heart"} size={24}></Icon></div>
        </div>
      </div>
    </div>
  )
}
