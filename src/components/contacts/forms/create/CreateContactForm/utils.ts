import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateContact = async (formData: AppTypes.ContactCreateInterface, token: string) => {
  // TODO verify fn
  const result = await AppActions.createContact(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}