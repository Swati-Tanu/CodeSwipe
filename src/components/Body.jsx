import React, { useEffect } from 'react'
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom"
import NavBar from './NavBar'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const userData = useSelector((store)=> store?.user)

  const fetchUser = async () => {
    if(userData) return;
    try {
    const token = localStorage.getItem("token");

    const response = await axios.get(BASE_URL + "/profile/view", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    dispatch(addUser(response?.data?.user))
    } catch (error) {
       if(error.status === 401){
        return navigate("/login")
       }
      console.log("ERROR: ", error)
    } 
  }

  useEffect(()=>{
    fetchUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
