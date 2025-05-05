import React, { useEffect } from "react";
import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard"

const Feed = () => {
  const feedData = useSelector(store => store?.feed)
  const dispatch = useDispatch()

  const getFeed =  async () => {
    try {
       if(feedData) return;
      const token = localStorage.getItem("token");

      const response = await axios.get(BASE_URL + "/user/feed", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(addFeed(response?.data?.users))
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(()=>{
    getFeed()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  

  if(!feedData) return;

  if(feedData.length <= 0) return <h1 className='text-bold text-2xl flex justify-center my-10'>No New User Found</h1>
  return (feedData && (<div className="flex justify-center my-10">
    <UserCard user={feedData[0]}/>
  </div>));
};

export default Feed;
