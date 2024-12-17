import React from 'react'
import { Link, useParams } from 'react-router-dom'

function UserCard(props) {
    const userObject=props.userObject
    const params=useParams()
    const isActive=params?.chatid === userObject.id

    return (
      <>
        <div key={userObject.id}>
          <Link className={`flex gap-4 items-center hover:bg-backGround p-2 rounded cursor-pointer ${isActive && "bg-backGround"}`} to={`/${userObject.id}`}>
              <img src={userObject.userData.profile} alt="" className='h-12 w-12 object-cover rounded-full'></img>
              <h2>{userObject.userData.name}</h2>
          </Link>
        </div>
      </>
    )
}

export default UserCard
