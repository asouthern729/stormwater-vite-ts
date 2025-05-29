import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateViolation = async (formData: AppTypes.ConstructionViolationCreateInterface, token: string) => {
  const result = await AppActions.createViolation(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(async date => {
        if(date.followUpDate) {
          await AppActions.createFollowUp({ ...date, violationId: result.data.violationId }, authHeaders(token))
        }
      })
    ])

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}