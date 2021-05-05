import React from 'react'
import { useAuth } from '../auth/AuthContext'
import Loader from 'react-loader-spinner'
import {BasePageTemplate} from '../authenticated/base-page-template'

export function HomePage() {  
  const {status} = useAuth()

  return (
    <div className="h-full w-full flex flex-col items-center">
    {
      !status.isLoading ? (
        <BasePageTemplate />
      ) : (
        <Loader type="BallTriangle"
                color="#00BFFF"
                height={50}
                width={50}
        />
      )
    }
    </div>)
}