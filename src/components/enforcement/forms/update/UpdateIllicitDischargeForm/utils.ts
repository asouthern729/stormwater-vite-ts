import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { IllicitDischargeCreateInterface } from "@/context/App/types"

export const handleUpdateIllicitDischarge = async (formData: IllicitDischargeCreateInterface, token: string) => {
  const result = await AppActions.updateIllicitDischarge(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(async followup => { // Follow up dates
        if(followup.followUpDate) {
          if(!followup.uuid) { // New follow up
            await AppActions.createFollowUp({ ...followup, illicitId: formData.illicitId }, authHeaders(token))
          } else await AppActions.updateFollowUp(followup, authHeaders(token)) // Update existing
        } else if(followup.uuid) { // Delete existing
          await AppActions.deleteFollowUp(followup.uuid, authHeaders(token))
        }
      })
    ])

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}