import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import { getUserDetailByUid } from '../../../firebase';

export default function Messages(props) {


    const [messages, setMessages] = useState([]);
    const getMessages = async () => {
        const dynMessages = [];
        await props.messagebox.then(async (res) => {
            let memberInfo = [];
            //console.log(memberInfo)
            await res.members.forEach(el => {

                if (el.userId == props.user.uid) {
                    return
                } else {
                    memberInfo = getUserDetailByUid(el.userId);
                }

            });


            await res.messages.forEach(message => {

                if (message.owner == props.user.uid) {
                    let owner = {
                        owner: true,
                        message: message.message,
                        time: message.time
                    }

                    dynMessages.push(owner);
                } else {
                    memberInfo.then(res => {
                        let member = {
                            owner: false,
                            profileImage: res.profileImage,
                            message: message.message,
                            time: message.time
                        }

                        dynMessages.push(member);
                    })
                }
            })

        })

        return dynMessages;
    }

    useEffect(() => {
        let result = getMessages()
        setTimeout(() => {
            setMessages(result)
        }, 700);
    }, [props])

    //console.count(messages)

    // console.log(messages)

    if (messages.length != 0) {
        messages.then(x=>{
            console.log(x)
            return (
                <div className='h-auto w-full'>
                    {x.forEach(message => {
                        <div  className='h-auto max-w-[45%]'>
                            <div className='h-auto w-auto'><p>{message.message}</p></div>
                            <div><img></img></div>
                        </div>
                    })}
                </div>
            )
           })
        
    } else {
        return (
            <div><strong>LOADİNG ...</strong></div>
        )
    }


}
