import React, {useContext, useState, useEffect} from 'react'
import {api} from './FirebaseApi'
import firebase from 'firebase'

const AuthContext = React.createContext({
  user: {} as firebase.User | null,
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  signUp: (email: string, password: string) => {},
  reloadUser: () => {},
  status: {} as {isLoading?: Boolean, errorMessage?: string}
})

AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: any) {
  const [status, setStatus] = useState({isLoading: false, errorMessage: ""})
  const [user, setUser] = useState(api.getCurrentUser)

  useEffect(() => {
    setStatus({isLoading: false, errorMessage: ""})
  }, [user])

  useEffect(() => {
    const unsubscribe = api.onAuthStateChanged(userStateChange, onAuthError)

    return () => {
      unsubscribe()
    }
  }, [])

  function userStateChange(user: firebase.User | null) {
    setUser(user)
  }

  function reloadUser() {
    userStateChange(api.getCurrentUser())
  }

  function onAuthError(err: firebase.auth.Error) {
    setStatus({
      isLoading: false,
      errorMessage: err.message
    })
  }

  async function signIn(email: string, password: string) {
    setStatus({...status, isLoading: true})
    api.signIn(email, password)
  }

  async function signOut() {
    setStatus({...status, isLoading: true})
    api.signOut()
  }

  async function signUp(email: string, password: string) {
    setStatus({...status, isLoading: true})
    api.signUp(email, password)
  }

  const value = {
    user,
    signIn,
    signOut,
    signUp,
    reloadUser,
    status
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