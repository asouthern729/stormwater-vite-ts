import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { setDateForForm } from "../../../../helpers/hooks"
import { handleUpdateGreenViolationFormSubmit } from "./utils"

// Types
import { UseFormReturn } from "react-hook-form"
import { UseUpdateGreenViolationFormProps, UpdateGreenViolationFormUseForm } from './types'

export const useUpdateGreenViolationForm = (green: UseUpdateGreenViolationFormProps['green']): UseFormReturn<UpdateGreenViolationFormUseForm> => { // UpdateGreenViolationForm useForm
  return useForm<UpdateGreenViolationFormUseForm>({
    defaultValues: {
      greenId: green.greenId,
      date: setDateForForm(green.date),
      xCoordinate: green.xCoordinate,
      yCoordinate: green.yCoordinate,
      locationDescription: green.locationDescription,
      inspectorId: green.inspectorId,
      details: green.details,
      comments: green.comments,
      responsibleParty: green.responsibleParty,
      enforcementAction: green.enforcementAction,
      penaltyDate: setDateForForm(green.penaltyDate),
      penaltyAmount: green.penaltyAmount,
      penaltyDueDate: setDateForForm(green.penaltyDueDate),
      paymentReceived: setDateForForm(green.paymentReceived),
      bondReleased: green.bondReleased,
      compliance: green.compliance,
      closed: green.closed,
      followUpDate: undefined,
      existingFollowUpDates: green.FollowUpDates.length ? green.FollowUpDates.map(followUp => {
        return { followUpDate: followUp.followUpDate, uuid: followUp.uuid }
      }) : [],
      uuid: green.uuid
    }
  })
}

export const useHandleFormSubmit = (handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()

  return useCallback((formData: UpdateGreenViolationFormUseForm) =>
    handleUpdateGreenViolationFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations'),
      handleCloseForm
    }), [queryClient, handleCloseForm]
  )
}