import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { useGetSiteUUID } from "../../../../../helpers/hooks"
import { setDateForForm } from "@/helpers/utils"
import { handleUpdateViolationFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { UseUpdateViolationFormProps, UpdateViolationFormUseForm } from './types'

export const useUpdateViolationForm = (violation: UseUpdateViolationFormProps['violation']): UseFormReturn<UpdateViolationFormUseForm> => { // UpdateViolationForm useForm
  return useForm<UpdateViolationFormUseForm>({
    defaultValues: {
      violationId: violation.violationId,
      siteId: violation.siteId,
      date: setDateForForm(violation.date),
      details: violation.details,
      enforcementAction: violation.enforcementAction,
      penaltyDate: setDateForForm(violation.penaltyDate),
      penaltyAmount: violation.penaltyAmount,
      penaltyDueDate: setDateForForm(violation.penaltyDueDate),
      paymentReceived: setDateForForm(violation.paymentReceived),
      swoDate: setDateForForm(violation.swoDate),
      swoLiftedDate: setDateForForm(violation.swoLiftedDate),
      compliance: violation.compliance,
      closed: violation.closed,
      followUpDate: undefined,
      existingFollowUpDates: violation.FollowUpDates.length ? violation.FollowUpDates.map(followUp => {
        return { followUpDate: followUp.followUpDate, uuid: followUp.uuid }
      }) : [],
      uuid: violation.uuid
    }
  })
}

export const useUpdateViolationFormContext = (): UseFormReturn<UpdateViolationFormUseForm> => { // UpdateViolationForm context
  const methods = useFormContext<UpdateViolationFormUseForm>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return useCallback((formData: UpdateViolationFormUseForm) => 
    handleUpdateViolationFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites')
    }), [queryClient, siteUUID]
  )
}