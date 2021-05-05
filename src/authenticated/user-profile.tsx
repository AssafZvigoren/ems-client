import React from 'react'
import { useAuth } from '../auth/AuthContext'
import {api} from '../auth/FirebaseApi'

export function UserProfile() {
  const {user, reloadUser} = useAuth()
  const {addImage, updateUserProfile} = api

  function uploadImage(e: any) {
    let image = e.target.files[0]
    addImage(image)
      .then(async (res) => {
        const url = await res.ref.getDownloadURL()
        return updateUserProfile({
          displayName: "sfaasdffasd",
          photoURL: url
        })
      })
      .then(res => {
        reloadUser()
      })
      .catch(err => {
        console.error({...err});
      })
  }

  return (
    <>
        {user?.displayName}
        <input type="file" accept="image/*" id="imageUploader" onChange={uploadImage}/>
      </>
  )
}
