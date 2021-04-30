import React, {useState, useEffect} from 'react'
import {useAuth} from '../auth/AuthContext'
import {axios} from 'axios'

export function UserProfile() {
  const {user} = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  // axios.ge
}
