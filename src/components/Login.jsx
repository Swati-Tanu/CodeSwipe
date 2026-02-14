import React, {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {addUser} from "../utils/userSlice"
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
    try {
      const response = await axios.post( BASE_URL + "/login", {
        emailId,
        password
      }) 

      const { token } = response.data;
      localStorage.setItem("token", token);
      
      dispatch(addUser(response?.data?.user))
      navigate("/feed")  // Changed from "/" to "/feed"
    } catch (error) {
      setError(error?.response?.data?.ERROR || "Something went wrong!")
      console.log("ERROR: ", error)
    }
  }

  const handleSignUp = async () => {
    try {
      const response = await axios.post( BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password
      }) 
      
      const { token } = response.data;
      localStorage.setItem("token", token);  // Changed from "jwtToken" to "token"

      dispatch(addUser(response?.data?.user))
      navigate("/profile")  // This will work now because token is set
    } catch (error) {
      setError(error?.response?.data?.ERROR || "Something went wrong!")
      console.log("ERROR: ", error)
    }    
  }

 return (
  <div className="flex justify-center my-10">
    <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title justify-center">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
        <div>
          <fieldset className="fieldset my-4">
            {!isLoginForm && <><legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name here..."
            />
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name here..."
            /></>}
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter your Email Id here..."
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password here..."
            />
          </fieldset>
        </div>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center m-2">
          <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>
           {isLoginForm ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <p className='m-auto cursor-pointer py-2' onClick={() => setIsLoginForm(value => !value)}>
          {isLoginForm ? 'New User? Sign Up Here' : 'Existing User? Login Here'}</p>
      </div>
    </div>
  </div>
);

}

export default Login
