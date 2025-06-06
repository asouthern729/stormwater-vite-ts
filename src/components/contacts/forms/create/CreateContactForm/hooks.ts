import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEnableQuery } from "@/helpers/hooks"
import ContactsCtx from "@/components/contacts/context"
import { handleCreateContact } from './utils'
import { errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateContactForm = () => { // CreateContactForm useform

  return useForm<AppTypes.ContactCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: ''
    }
  })
}

export const useCreateContactFormContext = () => { // CreateContactForm context
  const methods = useFormContext<AppTypes.ContactCreateInterface>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const { dispatch } = useContext(ContactsCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: AppTypes.ContactCreateInterface) => {
    if(!enabled || !token) return

    handleCreateContact(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getContacts')
        dispatch({ type: 'RESET_CTX' })
        navigate('/contacts')
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, navigate])
}