import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateComplaint = async (formData: AppTypes.ComplaintCreateInterface, token: string) => {
  const result = await AppActions.updateComplaint(formData, authHeaders(token))
  
    if(result.success) {
      await Promise.all([
        ...formData.FollowUpDates.map(async followup => { // Follow up dates
          if(followup.followUpDate) {
            if(!followup.uuid) { // New follow up
              await AppActions.createFollowUp({ ...followup, complaintId: formData.complaintId }, authHeaders(token))
            } else await AppActions.updateFollowUp(followup, authHeaders(token)) // Update existing
          } else if(followup.uuid) { // Delete existing
            await AppActions.deleteFollowUp(followup.uuid, authHeaders(token))
          }
        })
      ])
  
      savedPopup(result.msg)
    } else errorPopup(result.msg)
}