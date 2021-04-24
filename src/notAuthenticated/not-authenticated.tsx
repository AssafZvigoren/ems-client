import React, {useState} from 'react'
import {useAuth} from '../auth/AuthContext'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export function NotAuthenticated() {
  const {user, signIn, signUp} = useAuth()
  
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  async function clickedLogin() {
    signIn(emailValue, passwordValue)
  }

  async function clickedRegister() {
    signUp(emailValue, passwordValue)
  }

  return (
    <div className="h-full w-full p-5">
      <form className="p-4 max-w-sm mx-auto rounded-xl shadow-md flex flex-col items-center"  autoComplete="off">
        <div className="p-1">
          <TextField required id="email" value={emailValue} label="email" onChange={e => setEmailValue(e.target.value)} />
        </div>
        <div className="p-1">
          <TextField required id="password" type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} label="password" />
        </div>
        <div className="p-5">
          <Button variant="contained" onClick={clickedLogin}>Login</Button>
        </div>
        <div className="p-5">
          <Button variant="contained" onClick={clickedRegister}>Register</Button>
        </div>
        <div className="text-red-500">
          {user.errorMessage}
        </div>
      </form>
    </div>
  )
}