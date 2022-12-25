import React from 'react'

export default function Image({url , ...props}) {
  return (
    <img 
        {...props}
        src={process.env.PUBLIC_URL + `/assets/${url}`}
    ></img>
  )
}
