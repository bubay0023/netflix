import React from 'react'

export default function Notavailable({ tv }) {
  return (
    <h1 className='not-available'>{ tv? "Tv Show Not Found" : "Movie Not Found"}</h1>
   
  )}
