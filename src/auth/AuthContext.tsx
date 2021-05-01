import React, {useContext, useState, useEffect} from 'react'
import {AuthUser} from '../models/auth-user'
import axios from 'axios'
import {config} from '../config'
const {serverUrl} = config

const AuthContext = React.createContext({
  user: {} as AuthUser,
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  isSignedIn: () => {},
  signUp: (email: string, password: string) => {},
  isLoading: Boolean
})

AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: any) {
  const [user, setUser] = useState({} as AuthUser)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    isSignedIn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [user])

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true)
      // eslint-disable-next-line
      const response = await axios.post(`${serverUrl}/api/users/login`, {email, password})
      setUser({
        email,
        uid: response.data.uid,
        isAuthenticated: true
      })
    } catch (err) {
      console.error({...err})
      setUser({
        email,
        errorMessage: err.response.data
      })
    }
  }

  async function signOut() {
    try {
      setIsLoading(true)
      // eslint-disable-next-line
      const response = await axios.post(`${serverUrl}/api/users/logout`)
      console.log(response)
    } catch (err) {
      console.error({...err})
    } finally {      
      setUser({
        email: "",
        uid: "",
        isAuthenticated: false
      })
    }
  }

  async function signUp(email: string, password: string) {
    try {
      setIsLoading(true)
      // eslint-disable-next-line
      const response = await axios.post(`${serverUrl}/api/users/register`, {email, password})
      setUser({
        email,
        uid: response.data.uid,
        isAuthenticated: true
      })
    } catch (err) {
      console.error({...err})
      setUser({
        email,
        errorMessage: err.response.data
      })
    }
  }

  async function isSignedIn() {
    if (user.isAuthenticated !== undefined && user.isAuthenticated !== null)
      return user.isAuthenticated!
    else {
      try {
        const response = await axios.get(`${serverUrl}/api/users/isAuthenticated`)
        setUser({
          email: response.data.email,
          uid: response.data.uid,
          errorMessage: "",
          isAuthenticated: true
        })

        return true
      } catch (err) {
        setIsLoading(false)
        return false
      }
    }
  }

  const value = {
    user,
    signIn,
    signOut,
    signUp,
    isSignedIn,
    isLoading
  }

  return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be ysed wutgub a AuthProvider')
  }

  return context
}