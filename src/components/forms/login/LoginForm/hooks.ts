import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFormContext } from 'react-hook-form'
import UserContext from '../../../../context/User/UserContext'
import { onSubmit } from './utils'

// Types
import { UseFormReturn } from 'react-hook-form'
import { LoginFormUseFormState } from './types'

export const useLoginForm = (): UseFormReturn<LoginFormUseFormState> => { // LoginForm useForm
  return useForm<LoginFormUseFormState>({
    defaultValues: {
      email :'',
      password: ''
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  return useCallback((formData: LoginFormUseFormState) => 
    onSubmit(formData, { navigate, dispatch }), [navigate, dispatch]
  )
}