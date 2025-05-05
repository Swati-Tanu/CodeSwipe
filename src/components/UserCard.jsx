import React from 'react'
import axios from "axios"
import { BASE_URL } from '../utils/constants'
import {removeUserFromFeed} from "../utils/feedSlice"
import { useDispatch } from 'react-redux'

const UserCard = ({user}) => {
    const dispatch = useDispatch()
    const handleSendRequest = async (status, toUserId) => {
      try {
        const token = localStorage.getItem("token");
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(BASE_URL + "/request/send/" +  status + "/" + toUserId, {}, {

         headers: {
        Authorization: `Bearer ${token}`
      }
        } )
        dispatch(removeUserFromFeed(toUserId))
      } catch (error) {
        console.log("ERROR:", error)
      }
    }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="user_image" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.firstName} {user.lastName}</h2>
    {user.age && user.gender && <p>{user.age}, {user.gender}</p>}
    <p>{user.about}</p>
    <p>{Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "No skills listed"}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("ignored", user._id)}>Ignore</button>
       <button className="btn btn-primary"onClick={()=>handleSendRequest("interested", user._id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
