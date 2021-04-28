import React from 'react'
import { useAuth } from '../auth/AuthContext'
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner'

export function HomePage() {
  const {signOut, isLoading} = useAuth()

  function clickedSignOut() {
    signOut()
  }

  return (<div>
    HomePage
    {
      !isLoading ? (
        <div className="p-5">
          <Button variant="contained" onClick={clickedSignOut}>Sign out</Button>
        </div>
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