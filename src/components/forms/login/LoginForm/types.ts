// Types
import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { UserAction } from '../../../../context/User/types'

export interface LoginFormUseFormState { // LoginForm useForm state object
  email: string,
  password: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: LoginFormUseFormState
  options: {
    navigate: NavigateFunction
    dispatch: Dispatch<UserAction>
  }
}