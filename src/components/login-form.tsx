import React from 'react'
import { UserBaseDetails } from '../models/user-base-details'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

interface LoginProps {
  onSubmit: (user: UserBaseDetails) => void,
  option?: LoginFormOptions
}

export enum LoginFormOptions {
  login,
  register
}

export function LoginForm(props: LoginProps) {
  const currOption = props.option ? props.option! : LoginFormOptions.login

  return (
    <div>
      <form className="" noValidate autoComplete="off">
        <div>
          <TextField required id="email" label="email" />
        </div>
        <div>
          <TextField required id="password" type="password" label="password" />
        </div>
        <div>
          <Button variant="contained">{currOption === LoginFormOptions.register ? 'Register' : 'Login'}</Button>
        </div>
      </form>
    </div>
  )
}