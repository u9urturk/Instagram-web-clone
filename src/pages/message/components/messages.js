import userEvent from '@testing-library/user-event';
import classNames from 'classnames';
import React, { memo, useEffect, useState } from 'react'
import { getMessageboxByMessageSubscription, getUserDetailByUid } from '../../../firebase';

 function Messages(messages) {
    console.log(messages.messages);

    return (
        <div className='h-auto w-full'>
            {messages &&messages.messages.map((res, index) =>
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

export default memo(Messages)
