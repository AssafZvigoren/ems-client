import React from 'react'
import {useAuth} from '../auth/AuthContext'
import {NotAuthenticated} from '../notAuthenticated/not-authenticated'
import {HomePage} from '../components/home-page'

export function WelcomePage() {
  const {user} = useAuth()

  return (
    <div>
      {user.isAuthenticated ? HomePage() : NotAuthenticated()}
    </div>
  )
}