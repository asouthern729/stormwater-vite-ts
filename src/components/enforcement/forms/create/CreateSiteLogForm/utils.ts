import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateSiteLog = async (formData: AppTypes.SiteLogCreateInterface, token: string) => { // Handle form submit
  // TODO verify fn
  const result = await AppActions.createSiteLog(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}