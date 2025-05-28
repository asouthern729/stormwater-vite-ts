import { authHeaders } from '@/helpers/utils'
import { createFollowUp, createViolation } from '@/context/App/AppActions'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import { ConstructionViolationCreateInterface } from '@/context/App/types'

export const handleCreateViolation = async (formData: ConstructionViolationCreateInterface, token: string) => {
  const result = await createViolation(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(async date => {
        if(date.followUpDate) {
          await createFollowUp({ ...date, violationId: result.data.violationId }, authHeaders(token))
        }
      })
    ])

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}