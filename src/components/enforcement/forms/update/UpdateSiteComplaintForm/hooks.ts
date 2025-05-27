import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { handleUpdateSiteComplaintFormSubmit } from './utils'
import { setDateForForm, useGetSiteUUID } from "../../../../../helpers/hooks"

// Types
import { UseFormReturn } from "react-hook-form"
import { UseUpdateSiteComplaintFormProps, UpdateSiteComplaintFormUseForm } from './types'

export const useUpdateSiteComplaintForm = (complaint: UseUpdateSiteComplaintFormProps['complaint']): UseFormReturn<UpdateSiteComplaintFormUseForm> => { // UpdateComplaintForm useForm
  return useForm<UpdateSiteComplaintFormUseForm>({
    defaultValues: {
      complaintId: complaint.complaintId,
      siteId: complaint.siteId,
      date: setDateForForm(complaint.date),
      details: complaint.details,
      inspectorId: complaint.Inspector?.inspectorId,
      name: complaint.name,
      address: complaint.address,
      phone: complaint.phone,
      email: complaint.email,
      xCoordinate: complaint.xCoordinate,
      yCoordinate: complaint.yCoordinate,
      locationDescription: complaint.locationDescription,
      concern: complaint.concern,
      otherConcern: complaint.otherConcern,
      responsibleParty: complaint.responsibleParty,
      comments: complaint.comments,
      compliance: complaint.compliance,
      closed: complaint.closed,
      followUpDate: undefined,
      existingFollowUpDates: complaint.FollowUpDates.length ? complaint.FollowUpDates.map(followUp => {
        return { followUpDate: followUp.followUpDate, uuid: followUp.uuid }
      }) : [],
      uuid: complaint.uuid
    }
  })
}

export const useUpdateSiteComplaintFormContext = (): UseFormReturn<UpdateSiteComplaintFormUseForm> => { // UpdateSiteComplaintForm context
  const methods = useFormContext<UpdateSiteComplaintFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return useCallback((formData: UpdateSiteComplaintFormUseForm) => 
    handleUpdateSiteComplaintFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites'),
      handleCloseForm
    }), [queryClient, handleCloseForm, siteUUID]
  )
}