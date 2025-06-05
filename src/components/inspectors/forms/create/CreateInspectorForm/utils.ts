import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateInspectorFormSubmit = async (formData: AppTypes.InspectorCreateInterface, token: string) => { // Handle form submit
  // TODO verify fn
  const result = await AppActions.createInspector(formData, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}