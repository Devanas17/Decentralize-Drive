import React, {useState, useEffect, useContext} from 'react'
import { AppContext } from '../context/context'

const Feed = () => {
    const {accessLists,} = useContext(AppContext)
    console.log("Access List", accessLists)
  return (
    <div className='w-full p-4'>
        <h2 className="text-2xl text-gray-600 border-b p-1">My Files</h2>
    </div>
  )
}

export default Feed