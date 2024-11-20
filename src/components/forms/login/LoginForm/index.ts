import { useForm } from 'react-hook-form'
import { loginUser, validateToken } from '../../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import { LoginFormUseFormState, OnSubmitProps } from './types'

export const useLoginForm = (): UseFormReturn<LoginFormUseFormState> => { // LoginForm useForm
  return useForm<LoginFormUseFormState>({
    defaultValues: {
      email :'',
      password: ''
    }
  })
}

export const onSubmit = async (formData: OnSubmitProps['formData'], options: OnSubmitProps['options']): Promise<void> => { // Form submit
  const { navigate, dispatch } = options

  const result = await loginUser(formData)
  
  if(result.success) { // On success
    const data = await validateToken()

    if(data.success) {
      dispatch({ type: 'SET_USER', payload: { department: data.data.department, role: data.data.role, email: data.data.email } })

      setTimeout(() => {
        navigate('/')
      }, 2000)

      return authPopup()
    }

    return errorPopup(data?.msg || 'Something Went Wrong') // Handle error
  } else errorPopup(result.msg)
}