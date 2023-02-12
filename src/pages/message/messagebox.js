import { child, get, onChildAdded, onChildChanged, ref } from 'firebase/database'
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { act } from 'react-dom/test-utils'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Icon from '../../components/icon'
import { getMessageboxByMessageSubscription, getUserDetailByUid, returntools } from '../../firebase'
import MessageboxHeader from './components/messageboxHeader'
import messages from './components/messages'
import Messages from './components/messages'
import Sender from './components/sender'

export default function MessageBox() {
  // console.count("app rendered")

  const messageboxid = useParams();
  const user = useSelector(state => state.auth.user)
  const msRef = ref(returntools(), `/messages/${messageboxid.messageboxid}`)
  const mbRef = ref((returntools()), `/messageboxes/${messageboxid.messageboxid}`)

  function reducer(rstate, action) {
    switch (action.type) {

      case 'SET_MESSAGES':

        return {
          ...rstate,
          messages: action.value
        }

      case 'SET_MEMBERS':

        return {
          ...rstate,
          members: action.value
        }


      default:
        break;
    }


  }




  const [rstate, dispatch] = useReducer(reducer, {
    messages: [],
    members: []
  })


 

  const getMessages = useCallback(async (messages) => {
    const dynMessages = [];
    messages.forEach(message => {

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
          message: message.message,
          time: message.time
        }

        dynMessages.push(xmember);

      }
    })

    //console.log(dynMessages)
    return dynMessages;


  })


  useEffect(() => {


    const run = () => {
      const messages = []
      const unsub3 =  get(child(ref(returntools()), `messageboxes/${messageboxid.messageboxid}`)).then((snapshot)  => {

        // dispatch({
        //   type:'SET_MEMBERS',
        //   value:res
        // })
        console.log(snapshot.val());
  
      });
      const unsub1 = onChildAdded(msRef, async (snapshot) => {

        messages.push(snapshot.val())
        await getMessages(messages).then(res => {
          dispatch({
            type: 'SET_MESSAGES',
            value: res
          })
        })


      });
      const unsub2 = onChildChanged(msRef, async (snapshot) => {
        messages.push(snapshot.val());
        await getMessages(messages).then(res => {
          dispatch({
            type: 'SET_MESSAGES',
            value: res
          })
        })
        //console.log(snapshot.val());

      });



      return () => {
        unsub1();
        unsub2();
        unsub3();
      }



    }

    messageboxid.messageboxid && run();


  }, [messageboxid])

  //console.log(rstate.messages)

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
        <Sender messageBoxId={messageboxid} owner={user.uid} />
      </div>
    </div>
  )

}
