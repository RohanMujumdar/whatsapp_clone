import React from 'react'
import { Link } from 'react-router-dom'

function UserCard(props) {
    const userObject=props.userObject
  return (
    <>
      <div key={userObject.id}>
        <Link key={userObject.uid} className='flex gap-3 border-2' to={`/${userObject.id}`}>
            <img src={userObject.userData.profile} className='rounded-full h-10 w-10'></img>
            <h2>{userObject.userData.name}</h2>
        </Link>
      </div>
    </>
  )
}

export default UserCard
