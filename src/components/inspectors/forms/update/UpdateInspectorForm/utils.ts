import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateInspector = async (formData: AppTypes.InspectorCreateInterface, token: string) => {
  // TODO verify fn
  const result = await AppActions.updateInspector(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}