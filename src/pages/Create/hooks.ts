import { useLocation } from 'react-router'

// Types
import { CreateFormType } from './types'

export const useSetFormType = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const formType = queryParams.get('formType')

  return formType as CreateFormType
}