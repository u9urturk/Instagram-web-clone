import { getMessageboxByMessageSubscription, getMessageSubscriptionsByUserId, getUserDetailByUid, } from '../../firebase.js'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, Outlet } from 'react-router-dom'
import Header from './components/header'
import { useSelector } from 'react-redux'



export default function DirectLayout() {
    const user = useSelector(state => state.auth.user)
    const messageboxes=[];
    
    const [re, setRe] = useState([]);

    const gettest =  async ()=>{
        const result =  getMessageSubscriptionsByUserId(user.uid)
       
        await result.then(res=>{
              
              res.messageboxesid.forEach(element => {
                 const mbResult = getMessageboxByMessageSubscription(element)
                 mbResult.then(mbr=>{
                     
                   mbr.members.forEach(member=>{
                          if(member.userId == user.uid){
                              return;
                          }else {
                              const res = getUserDetailByUid(member.userId)
                              res.then(e=>{
                                  let messagebox = {
                                      
                                          messageboxid:element,
                                          formationTime:mbr.formationtime,
                                          fullName:e.full_name,
                                          profileImage:e.profileImage,
                                          lastMessage:mbr.messages[mbr.messages.length-1]
                                         
                                  }
                                  
                                     messageboxes.push(messagebox);
                                  
                                  
                              })
                          }
                      })
  
                 })
              });   
                
        }) 
     return messageboxes;
    }



    useEffect( () => {       
        const start = async()=>{
            const x = await gettest();
            setTimeout(() => {
                setRe(x);
            }, 500);
        }

        start();
       
     
    }, [])
 
   
    //console.log(messageboxes);
    //console.log(re);

    return (
        <div className=' flex relative


          max-w-[935px] max-h-[590px] bg-white border rounded border-gray-300 '>
            <Helmet>
                <title>Inbox</title>
            </Helmet>
            <div className='flex-auto min-w-4/10 max-w-4/10'>
                <Header user={user.username}></Header>
                {re.map(x => (


                    <NavLink key={x.messageboxid} to={`/direct/t/${x.messageboxid}`} className='px-4 pt-4 flex flex-col-2 gap-x-4 cursor-pointer hover:bg-gray-50 transition-all'>

                        <div  >
                            <img className="w-16 h-16 rounded-full" src={x.profileImage}></img>
                        </div>
                        <div className='pt-2' >
                            <h1 className='font-medium text-black  text-base'>{x.fullName}</h1>
                            <p className='text-gray-400 text-sm  -mt-4  font-light'>{x.lastMessage.message}</p>
                        </div>
                    </NavLink>

                ))}

            </div>
            <div className='border-l flex-auto min-w-6/10 max-w-6/10 h-[590px]'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
