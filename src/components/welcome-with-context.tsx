import React from 'react'
import {useAuth} from '../auth/AuthContext'
import {NotAuthenticated} from '../notAuthenticated/not-authenticated'
import {HomePage} from '../components/home-page'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export function WelcomePage() {
  const {user, isLoading} = useAuth()

  return (
    <div className="h-full w-full flex flex-col items-center">
      {!!isLoading ? (
        <Loader type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
        />
      ) : 
        user.isAuthenticated ? (
          <HomePage />
        ) : (
          <NotAuthenticated />
        )
      }
    </div>
  )
}