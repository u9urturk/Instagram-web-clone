import React, { memo } from 'react'
import Icon from '../../../components/icon'

function MessageboxHeader(member) {
    //console.log(member)
    // return (
    //     <div className='px-10 h-full w-full flex items-center'>
    //         <div className='flex items-center justify-start gap-x-3  h-full w-full'>
    //             <div className='h-10 w-10 '><img className="rounded-full" src={member?.member.profileImage}></img></div>
    //             <strong>{member.member.full_name}</strong>
    //         </div>
    //         <div className='cursor-pointer'>
    //             <Icon name={"info"} size={24}></Icon>
    //         </div>
    //     </div>
    // )
}


export default memo(MessageboxHeader)
