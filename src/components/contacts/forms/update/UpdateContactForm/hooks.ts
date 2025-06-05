import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import ContactsCtx from "@/components/contacts/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleUpdateContact } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup } from "@/utils/Toast/Toast"

export const useUpdateContactForm = (contact: AppTypes.ContactInterface) => { // UpdateContactForm useForm state

  return useForm<AppTypes.ContactCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email,
      inactive: contact.inactive,
      uuid: contact.uuid
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(ContactsCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.ContactCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateContact(formData, token)
      .then(_ => queryClient.invalidateQueries(['getContact', formData.uuid]))
      .catch(err => errorPopup(err))
  }, [enabled, token])
}