import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { ComplaintCreateInterface } from "@/context/App/types"

export const handleCreateComplaint = async (formData: ComplaintCreateInterface, token: string) => {
  const result = await AppActions.createComplaint(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(async date => {
        if(date.followUpDate) {
          await AppActions.createFollowUp({ ...date, complaintId: result.data.complaintId }, authHeaders(token))
        }
      })
    ])

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}