import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateComplaint = async (formData: AppTypes.ComplaintCreateInterface, token: string) => {
  // TODO verify fn
  const result = await AppActions.createComplaint(formData, authHeaders(token))

  if(result.success) {
    if(formData.FollowUpDates.length) {
      await Promise.all(
        formData.FollowUpDates.map(date => {
          if(date.followUpDate) {
            AppActions.createFollowUp({ ...date, complaintId: result.data.complaintId }, authHeaders(token))
          }
        })
      )
    }

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}