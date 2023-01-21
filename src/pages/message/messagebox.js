import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Icon from '../../components/icon'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../firebase'
import MessageboxHeader from './components/messageboxHeader'
import Messages from './components/messages'
import Sender from './components/sender'

export default function MessageBox() {
 // console.count("app rendered")

  const messageboxid = useParams();
  const user = useSelector(state => state.auth.user)

  function reducer(rstate, action) {
    switch (action.type) {
      case 'SET_MEMBER':

        return {
          ...rstate,
          newMember: true,
          member: action.value

        }

      case 'SET_MESSAGEBOX':

        return {
          ...rstate,
          messageBox: action.value
        }

      case 'SET_MESSAGES':

        return {
          ...rstate,
          newMember: false,
          messages: action.value
        }

      case 'NEW_MEMBER':

        return {
          ...rstate,
          newMember: action.value
        }

      default:
        break;
    }


  }




  const [rstate, dispatch] = useReducer(reducer, {
    messages: [],
    member: [],
    messageBox: [],
    newMember: false
  })

  const getMessages = useCallback(async (memberImage, messages) => {
    const dynMessages = [];
    //console.log(member)
    await messages.then(res => {
      //console.log(res.messages)
      res.messages.forEach(message => {

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
    })

    return dynMessages;

  }, [rstate.newMember])


  const createMember = useCallback(() => {
    const messagebox = getMessageboxByMessageSubscription(messageboxid.messageboxid);

    dispatch({
      type: 'SET_MESSAGEBOX',
      value: messagebox
    })
    messagebox.then(x => {
      //console.log(x.messages)
      x.members.forEach(res => {
        if (res.userId == user.uid) {
          return
        } else {
          getUserDetailByUid(res.userId).then(res => {
            dispatch({
              type: 'SET_MEMBER',
              value: res
            })
          })

        }
      });



    })



  }, [messageboxid])



  useEffect(() => {
    createMember()

  }, [messageboxid])


  useEffect(() => {

    if (rstate.newMember) {
      //console.log(rstate.newMember)
      getMessages(rstate.member.profileImage, rstate.messageBox).then(res => {
        dispatch({
          type: 'SET_MESSAGES',
          value: res
        })
      })


    }

  }, [rstate.newMember])




  //console.count(member)
  //console.log(rstate.newMember)

  return (
    <div className=''>
      {/* Header */}
      <div className='w-full h-[60px]  border-b border-gray-300'>
        <MessageboxHeader member={rstate.member} />
      </div>
      {/* Body */}
      <div className='h-[440px]'>
        <Messages messages={rstate.messages} />
      </div>
      {/* Input */}
      <div className='w-full flex items-center justify-center h-[84px] '>
        <Sender messageBoxId={messageboxid} owner={user.uid}/>
      </div>
    </div>
  )

}
