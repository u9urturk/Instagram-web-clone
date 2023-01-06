import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { createMessageBox, getAllUsers, getUserInfo, getUserUid } from '../firebase.js';
import Icon from './icon';

export default function Modal({ isVisible = false, onClose, ...props }) {
    const user = useSelector(state => state.auth.user)
    const [users, setUsers] = useState([])
    const [sUser, setSUser] = useState([])
    const [usernames, setUsernames] = useState(null)
    const [members , setMembers] = useState([])
    const vb = () => {
        localStorage.clear()
        setUsernames([])
        onClose()
    }

    function tb(xuser) {
        let ast = false;
        usernames && usernames.forEach(element => {

            if (xuser == element.name) {

                ast = true;
            }
        });

        return ast;
    }

    useEffect(() => {
        var xmembers =[
            {
                userId:user.uid
            }
        ]
            
        
        
        if(usernames){
            usernames.map(_username=> {
                getUserUid(_username.name).then(xs=>{
                 xmembers.push({userId:xs.user_id})
               })
               setMembers(xmembers)
            });
            //toast.success("ok")
            

            
        }
    }, [usernames])
    

    const forwardMessage= ()=>{
       

       


        if( members.length  >1){
           // console.log(members.length)
            toast.success("ok")
            createMessageBox(members);
        }else{
            toast.error("Mesaj kutusu oluşturulamadı")
        }

        
    }

    useEffect(() => {

        const user = {
            
            name: sUser.username

        }
        //console.log(user)
        if (user.name != "" && JSON.parse(localStorage.getItem("users") == null)) {
            localStorage.setItem("users", JSON.stringify([]))
        }
        if (user.name != "" && user.name) {

            let isValidate = true
            const selectUsers = JSON.parse(localStorage.getItem("users"))
            selectUsers.forEach(element => {
                if (element.name == user.name) {
                    isValidate = false;
                    toast.error("Kullanıcı seçilmiş durumda")
                }
            });

            if (isValidate) {
                selectUsers.push(user);
                localStorage.setItem("users", JSON.stringify(selectUsers))
                setUsernames(selectUsers);
            }



        }
    }, [sUser])

    useEffect(() => {
        getAllUsers().then(xs => {
            setUsers(xs)
            //console.log(users)
        })
    }, [])
    


    if (isVisible === false) {
        return;
    }
    return (
        <div className='fixed inset-0 transition-shadow bg-black bg-opacity-30 backdrop-blur-[2px]
        flex items-center justify-center'>

            <div className='h-[467px] w-[400px]  shadow-slate-700 shadow-2xl bg-white rounded-2xl'>
                {/* MODAL HEADER*/}
                <div className="flex items-center justify-between px-5 border-b h-14 w-full border-gray-300 ">
                    <div onClick={vb} className='cursor-pointer'> <Icon name={"cancel"}></Icon></div>
                    <h6 className='text-lg font-semibold'>New Message</h6>
                    <a href='#' onClick={forwardMessage} className='font-semibold text-base hover:text-black transition-all'>Forward</a>
                </div>
                {/*MODAL BODY*/}
                <div className='border-b transition-all overflow-y-auto max-h-[200px] flex-col gap-y-2 pt-2'>
                    <div className='px-2'><p className='font-semibold text-lg'>To who:</p></div>
                    <div className='px-3 grid grid-cols-2 gap-x-10 gap-y-2'>
                        {usernames != null && usernames.map((elmt,key) => (
                            <div key={key} className='w-auto  rounded-xl h-[26px] gap-x-1 flex items-center justify-center  bg-[#e0f1ff]'>

                                <div> <h1 className='text-sm font-extrabold text-blue-600'>{elmt.name}</h1></div>
                                {/* <div className='cursor-pointer' ><Icon name={"cancel"} size={10} ></Icon></div> */}

                            </div>

                        ))}
                    </div>
                    < div > <input placeholder='Search ...' className=' text-[15px] px-4 w-full h-[30px] outline-none'></input></div>
                </div>
                <div className='  flex-col gap-y-4 pt-2'>
                    <div className=' px-2 '><p className='font-semibold text-lg'>Recommended</p></div>
                    <div className='px-1 overflow-y-auto h-[290px]  '>
                        {users.map((user, key) => (
                            <div key={key} className='px-6  pt-4 flex items-center justify-between'>
                                <div className='flex items-center gap-x-3'>
                                    <img className="rounded-full w-[56px] h-[56px]" src={user.profileImage}></img>
                                    <div>
                                        <h6 className='font-semibold'>{user.username}</h6>
                                        <p className='text-gray-500'>{user.fullname}</p>
                                    </div>
                                </div>

                                <div onClick={() => { setSUser(user) }}
                                    className={classNames({
                                        'h-[24px] w-[24px] cursor-pointer  border-[2px] border-gray-700 rounded-full': true,
                                        'bg-facebook  border-none': tb(user.username)

                                    })}></div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div >
    )
}
