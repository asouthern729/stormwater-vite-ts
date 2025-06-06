import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateContact = async (formData: AppTypes.ContactCreateInterface, token: string) => {
  const result = await AppActions.updateContact(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}