import React from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const NavBar = () => {
    const userData = useSelector((store)=>store?.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(BASE_URL + "/logout", {}, {

         headers: {
        Authorization: `Bearer ${token}`
      }
        })
        localStorage.removeItem("token");
        dispatch(removeUser())
        navigate("/login")
      } catch (error) {
        console.log("ERROR", error)
      }
    }

  return (
    <div>
       <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Code Swipe</Link>
      </div>
      {!userData && (<div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="user_image"
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png" />
            </div>
          </div>
        </div>
      </div>)}
      {userData && (<div className="flex gap-2">
        <div>Welcome, {userData?.firstName}</div>
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="user_image"
                src={userData?.photoUrl}/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">Profile</Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Connection Requests</Link></li>
            <li><Link to="/premium">Premium</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>)}
    </div>
    </div>
  )
}

export default NavBar
