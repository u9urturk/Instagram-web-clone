import userEvent from '@testing-library/user-event';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../../firebase';

export default function Messages(props) {


    const [messages, setMessages] = useState([]);


    const getMessages = async () => {
        const dynMessages = [];
        const messagebox = getMessageboxByMessageSubscription(props.messageboxid.messageboxid)
        await messagebox.then(async (res) => {
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
        const start = async () => {
            const result = getMessages()
            setTimeout(() => {
                result.then(res => {
                    setMessages(res.reverse());
                })
            }, 500);
        }

        start();



    }, [props])

    //console.log(messages)

    //console.count(messages)

    // console.log(messages)

    return (
        <div className='h-auto w-full'>
            {messages.map((res, index) =>
                <div key={index} className='h-auto w-full py-2 px-5  '>
                    <div className={classNames({
                        "flex gap-x-2":true,
                        "justify-end":res.owner
                    })}>
                    {!res.owner&&<div className='flex items-end' ><img  className='w-8 h-8 rounded-full ' src={res.profileImage}></img></div>}
                        <div className={classNames({
                            'h-auto max-w-[45%] p-4  rounded-full':true,
                            'bg-gray-300':res.owner,
                            'border border-gray-300':!res.owner
                        })}>
                            <div className='h-auto w-auto'><p>{res.message}</p></div>
                        </div>
                       
                    </div>

                </div>
            )}
        </div>
    )


}
