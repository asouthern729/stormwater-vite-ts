import { loginUser, validateToken } from '../../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../../utils/Toast/Toast'

// Types
import { OnSubmitProps } from './types'

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