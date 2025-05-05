import React, {useState} from 'react'
import UserCard from "./UserCard"
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [age, setAge] = useState(user?.age || "")
  const [gender, setGender] = useState(user?.gender || "")
  const [about, setAbout] = useState(user?.about)
  const [skills, setSkills] = useState(user?.skills  || [])
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()

  const saveProfile = async () => {
    setError("")
    setShowToast(false)
    // eslint-disable-next-line no-unused-vars
    const i = setTimeout(()=>{
      setShowToast(false)
    },3000)

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, photoUrl, about, age, gender, skills
      }, {
         headers: {
        Authorization: `Bearer ${token}`
      }
      })

      dispatch(addUser(response?.data?.updatedDetails))
      setShowToast(true)
    } catch (error) {
      console.log("ERROR", error)
      setError(error?.response?.data?.ERROR)
    }
  }

  return (
    <>
    {showToast && (<div className="toast toast-top toast-start">
      <div className="alert alert-info">
        <span>Your profile updated successfully!</span>
      </div>
      </div>)}
          <div className='flex justify-center my-10'>
          <div>
            <div className="flex justify-center mx-10">
              <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title justify-center">Edit Profile</h2>
                  <div>
                    <fieldset className="fieldset my-4">
                      <legend className="fieldset-legend">First Name</legend>
                      <input
                        type="text"
                        value={firstName}
                        className="input"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <legend className="fieldset-legend">Last Name</legend>
                      <input
                        type="text"
                        value={lastName}
                        className="input"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <legend className="fieldset-legend">Age</legend>
                      <input
                        type="number"
                        value={age}
                        className="input"
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <legend className="fieldset-legend">Gender</legend>
                      <input
                        type="text"
                        value={gender}
                        className="input"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <legend className="fieldset-legend">About</legend>
                      <input
                        type="text"
                        value={about}
                        className="input"
                        onChange={(e) => setAbout(e.target.value)}
                      />
                      <legend className="fieldset-legend">Skills</legend>
                      <input
                        type="text"
                        value={skills}
                        className="input"
                        onChange={(e) => setSkills(e.target.value)}
                      />
                      <legend className="fieldset-legend">Photo</legend>
                      <input
                        type="text"
                        value={photoUrl}
                        className="input"
                        onChange={(e) => setPhotoUrl(e.target.value)}
                      />
                    </fieldset>
                  </div>
                  <p className="text-red-500">{error}</p>
                  <div className="card-actions justify-center m-2">
                    <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UserCard user={{firstName, lastName, photoUrl, about, age, gender, skills}}/>
        </div> 
      {showToast}
    </>
);
}

export default EditProfile
