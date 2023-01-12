import { getMessageboxByMessageSubscription, getMessageSubscriptionsByUserId, getUserDetailByUid, } from '../../firebase.js'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { useSelector } from 'react-redux'



export default function DirectLayout() {
    const user = useSelector(state => state.auth.user)
    //console.log(result)
    const [re, setRe] = useState([]);

    const messageboxes = []


    useEffect(() => {


        const messagesubscriptions = getMessageSubscriptionsByUserId(user.uid);

        messagesubscriptions.then(result => {
            //console.log(result)

            result.messageboxesid.forEach(e => {
                //console.log(e)

                const messagebox = getMessageboxByMessageSubscription(e);
                messagebox.then(mbresult => {
                    //messageboxes.push(result);
                    //console.log(mbresult)
                    mbresult.members.forEach(e => {
                        if (e.userId === user.uid) {
                            return
                        } else {
                            const userDetail = getUserDetailByUid(e.userId);
                            const lastMessage = mbresult.messages[mbresult.messages.length - 1];
                            userDetail.then(result => {
                                let messagebox = {
                                    fullName: result.full_name,
                                    profileImage: result.profileImage,
                                    lastMessage: lastMessage

                                };

                                if (messagebox) {
                                    messageboxes.push(messagebox);
                                }
                            })
                        }
                    });

                })



            });

        })

        console.count()



    }, [messageboxes])


    console.count(re)



    const inboxs = [
        {
            id: 1,
            url: "pf1.jpg",
            name: "Yasemin",
            message: "Lorem ipsum dolor sit amet,"
        },
        {
            id: 2,
            url: "pf2.jpg",
            name: "Merve",
            message: "At lectus urna duis convallis. "
        },
        {
            id: 3,
            url: "pf3.jpg",
            name: "Eda",
            message: " Id nibh tortor id aliquet lectus proin nibh."
        },
    ]





    return (
        <div className=' flex relative


          max-w-[935px] max-h-[590px] bg-white border rounded border-gray-300 '>
            <Helmet>
                <title>Inbox</title>
            </Helmet>
            <div className='flex-auto min-w-4/10 max-w-4/10'>
                <Header user={user.username}></Header>
                {re.map((x, key) => (


                    <div key={key} className='px-4 pt-4 flex flex-col-2 gap-x-4 cursor-pointer hover:bg-gray-50 transition-all'>

                        <div  >
                            <img className="w-14 h-14 rounded-full" src={x?.profileImage}></img>
                        </div>
                        <div className='pt-3' >
                            <h1 className='font-normal text-sm'>{x?.fullName}</h1>
                            <p className='text-gray-400 text-sm font-light'>{x?.lastMessage.message}</p>
                        </div>
                    </div>

                ))}

            </div>
            <div className='border-l flex-auto min-w-6/10 max-w-6/10 h-[590px]'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
