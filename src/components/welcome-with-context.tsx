import React from 'react'
import {useAuth} from '../auth/AuthContext'
import {NotAuthenticated} from '../notAuthenticated/not-authenticated'
import {HomePage} from '../components/home-page'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export function WelcomePage() {
  const {user, status} = useAuth()

  return (
    <div className="h-full w-full flex flex-col items-center">
      {status.isLoading && !user ? (
        <Loader type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
        />
      ) : 
        user ? (
          <HomePage />
        ) : (
          <NotAuthenticated />
        )
      }
    </div>
  )
}