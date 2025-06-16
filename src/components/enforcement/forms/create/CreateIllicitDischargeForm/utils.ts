import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateIllicitDischarge = async (formData: AppTypes.IllicitDischargeCreateInterface, token: string) => {
  // TODO verify fn
  const watershed = formData.otherStreamWatershed ? formData.otherStreamWatershed : formData.streamWatershed
  const result = await AppActions.createIllicitDischarge({ ...formData, streamWatershed: watershed }, authHeaders(token))

  if(result.success) {
    if(formData.FollowUpDates.length) {
      await Promise.all(
        formData.FollowUpDates.map(date => {
          if(date.followUpDate) {
            AppActions.createFollowUp({ ...date, illicitId: result.data.illicitId }, authHeaders(token))
          }
        })
      )
    }

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}