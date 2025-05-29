import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { IllicitDischargeCreateInterface } from "@/context/App/types"

export const handleCreateIllicitDischarge = async (formData: IllicitDischargeCreateInterface, token: string) => {
  const result = await AppActions.createIllicitDischarge(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(async date => {
        if(date.followUpDate) {
          await AppActions.createFollowUp({ ...date, violationId: result.data.illicitId }, authHeaders(token))
        }
      })
    ])

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}