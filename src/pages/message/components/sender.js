import classNames from 'classnames'
import React, { memo, useState } from 'react'
import Icon from '../../../components/icon'
import { sendMessagesByMessageboxid, test } from '../../../firebase'

function Sender(props) {

  //console.log(props.owner)

  const [messages, setMessages] = useState("")

  //console.log(messages)

  const messagesIsEmpty = () => {
    if (messages.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  const submitHandle = e => {
    e.preventDefault()
    //console.log(messages)
    sendMessagesByMessageboxid(messages,props.owner, props.messageBoxId.messageboxid  )
  }


  return (
    <form onSubmit={submitHandle} className='h-[42px] border border-gray-300 rounded-l-full   rounded-r-full flex items-center  px-4 w-full max-w-[90%]'>
      <div className='w-[40px] cursor-pointer flex items-center justify-center'><Icon name={"ifade"} size={22}></Icon></div>
      <div className='w-[420px] '><input onChange={e => setMessages(e.target.value)} className='outline-none w-full px-2' placeholder='Message...'></input></div>
      <div className='flex items-center justify-center' >
        <div className={classNames({
          'w-[40px] cursor-pointer flex items-center justify-center ': true,
          'hidden': !messagesIsEmpty()
        })}><Icon name={"pictureadd"} size={22}></Icon></div>
        <div className={classNames({
          'w-[40px] cursor-pointer flex items-center  justify-center ': true,
          'hidden': !messagesIsEmpty()
        })}><Icon name={"heart"} size={22}></Icon></div>
        <button type='submit'   className={classNames({
          'text-facebook ': true,
          'hidden': messagesIsEmpty()
        })}><strong >Send</strong></button>
      </div>
    </form>
  )
}


export default memo(Sender)
