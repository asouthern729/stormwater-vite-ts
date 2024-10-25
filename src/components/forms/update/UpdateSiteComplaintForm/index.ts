import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { updateComplaint, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { ComplaintObj, FollowUpObj } from "../../../../context/App/types"
import { Concern } from "../../create/CreateSiteComplaintForm/types"
import { UseUpdateSiteComplaintFormProps, UpdateSiteComplaintFormUseForm, HandleUpdateSiteComplaintFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

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

export const handleUpdateSiteComplaintFormSubmit = async (formData: HandleUpdateSiteComplaintFormSubmitProps['formData'], options: HandleUpdateSiteComplaintFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, resetState } = options

  const complaintObj: ComplaintObj = {
    complaintId: formData.complaintId,
    siteId: formData.siteId as string,
    date: formData.date,
    details: formData.details,
    inspectorId: formData.inspectorId,
    name: formData.name,
    address: formData.address,
    phone: formData.phone,
    email: formData.email,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    concern: formData.concern as Concern,
    otherConcern: formData.otherConcern,
    responsibleParty: formData.responsibleParty,
    comments: formData.comments,
    compliance: formData.compliance,
    closed: formData.closed,
    uuid: formData.uuid
  }

  const result = await updateComplaint(complaintObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: formData.complaintId
      }

      const followUpResult = await createFollowUp(followUpObj)

      if(!followUpResult.success) {
        errorPopup(followUpResult.msg)
      }
    }

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}