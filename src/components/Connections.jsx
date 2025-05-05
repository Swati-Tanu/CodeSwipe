import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'
import {addConnections} from "../utils/connectionsSlice"
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Connections = () => {
    const connections = useSelector((store)=>store?.connections)
    const dispatch = useDispatch()
    const fetchConnections = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(BASE_URL + "/user/connections", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            dispatch(addConnections(response?.data?.myConnections))
            } catch (error) {
                console.log("ERROR:", error)
            }
         }

    useEffect(()=>{
        fetchConnections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!connections) return;

    if(connections.length === 0) return <h1 className='text-bold text-2xl flex justify-center my-10'>No Connections Found</h1>
    return (
      <div className='text-center my-10'>
        <h1 className='text-bold text-white text-4xl'>Connections</h1>
        {connections.map(connection => { 
          const {_id, firstName, lastName, age, gender, skills, about, photoUrl} = connection
          return (
          <div key={_id} className='flex m-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto'>
              <div>
              <img alt="image" className='w-20 h-20 rounded-full' src={photoUrl}/>
              </div>
              <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{firstName} {lastName} </h2>
              {age && gender && <p>{age} {gender}</p>}
              <p>{about}</p>
              <p>{skills}</p>
              <Link to={"/chat/" + _id}>
                <button className="btn btn-primary">Chat</button>
              </Link>
              </div>
        </div>)})}
      </div>
    )
  }

export default Connections
