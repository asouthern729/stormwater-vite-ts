import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateViolation } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateViolationForm = (violation: AppTypes.ConstructionViolationInterface) => { // UpdateViolationForm useForm

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...violation,
      date: formatDate(violation.date),
      penaltyDate: formatDate(violation.penaltyDate),
      penaltyDueDate: formatDate(violation.penaltyDueDate),
      paymentReceived: formatDate(violation.paymentReceived),
      swoDate: formatDate(violation.swoDate),
      swoLiftedDate: formatDate(violation.swoLiftedDate),
      FollowUpDates: violation.FollowUpDates?.map(followup => ({
        ...followup,
        followUpDate: formatDate(followup.followUpDate)
      }))
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateViolation(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getViolations')
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}