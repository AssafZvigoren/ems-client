import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {config} from '../config'
import Loader from 'react-loader-spinner'

export function UserProfile() {
  const [userDetails, setUserDetails] = useState({displayName: "", photoURL: ""})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  }, [userDetails])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${config.serverUrl}/api/users/getUserProfile`)
      .then(res => {
        const {displayName, photoURL} = res.data
        setUserDetails({displayName: "asdads", photoURL})
      })
      .catch(err => {
        setIsLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    {isLoading ? (
      <Loader type="BallTriangle"
              color="#00BFFF"
              height={100}
              width={100}
      />
    ) : (
      <>
        {userDetails.displayName}
      </>
    )}
    </>
  )
}
