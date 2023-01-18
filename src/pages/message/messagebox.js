import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Icon from '../../components/icon'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../firebase'
import MessageboxHeader from './components/messageboxHeader'
import Messages from './components/messages'

export default function MessageBox() {
  console.log("app rendered")

  const user = useSelector(state => state.auth.user)
  const messageboxid = useParams();
  const [member, setMember] = useState([])
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  
  const createMember = async () => {
    const messagebox = getMessageboxByMessageSubscription(messageboxid.messageboxid);
    let memberImage = ""
     await messagebox.then(x => {
      //console.log(x.messages)
      x.members.forEach(res => {
        if (res.userId == user.uid) {
          return
        } else {
          getUserDetailByUid(res.userId).then(res=>{
            setMember(res);
            memberImage=res.profileImage
          })
          
        }
      });

    })

    setTimeout(() => {
       messagebox.then(res=>{
       getMessages(memberImage,res.messages)
      })
    }, 500);
       

  }

  const getMessages = useCallback( async (memberImage,messages) => {
    const dynMessages = [];
    //console.log(member)
      await messages.forEach(message => {

        if (message.owner == user.uid) {
          let owner = {
            owner: true,
            message: message.message,
            time: message.time
          }

          dynMessages.push(owner);
        } else {
          
            let xmember = {
              owner: false,
              profileImage: memberImage,
              message: message.message,
              time: message.time
            }

            dynMessages.push(xmember);
          
        }
      })

      //console.log(dynMessages)

      setMessages(dynMessages);


      
  },[member])

  useEffect(() => {
    // const start = async () => {
    //   const result = getMessages();
    //   await result.then(res => {
    //     setMessages(res);
    //   })
    // }

    // start();

    createMember()
   

  }, [messageboxid])

 

  //console.count(member)

  //console.log(member)

  return (
    <div className=''>
      
      {/* Header */}
      <div className='w-full h-[60px]  border-b border-gray-300'>
        <MessageboxHeader member={member}/>
      </div>
      {/* Body */}
      <div className='h-[440px]'>
        <Messages messages={messages}  />
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
