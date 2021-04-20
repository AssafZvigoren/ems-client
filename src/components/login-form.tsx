import React, { useState } from 'react'
import { UserBaseDetails } from '../models/user-base-details'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

interface LoginProps {
  onSubmit: (user: UserBaseDetails) => void,
  option?: LoginFormOptions,
  errorMessage?: string
}

export enum LoginFormOptions {
  login,
  register
}

export function LoginForm(props: LoginProps) {
  const currOption = props.option ? props.option! : LoginFormOptions.login
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  function clickedSubmit() {
    props.onSubmit({email: emailValue, password: passwordValue})
  }

  return (
    <div>
      <form className="" autoComplete="off">
        <div>
          <TextField required id="email" value={emailValue} label="email" onChange={e => setEmailValue(e.target.value)} />
        </div>
        <div>
          <TextField required id="password" type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} label="password" />
        </div>
        <div>
          <Button variant="contained" onClick={clickedSubmit}>{currOption === LoginFormOptions.register ? 'Register' : 'Login'}</Button>
        </div>
        <div>
          {props.errorMessage !== "" ? props.errorMessage : ""}
        </div>
      </form>
    </div>
  )
}