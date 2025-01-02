import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateComplaint, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { ComplaintObj, FollowUpObj } from "../../../../context/App/types"
import { Concern } from "../../create/CreateSiteComplaintForm/types"
import { HandleUpdateSiteComplaintFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const handleUpdateSiteComplaintFormSubmit = async (formData: HandleUpdateSiteComplaintFormSubmitProps['formData'], options: HandleUpdateSiteComplaintFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, handleCloseForm } = options

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
    locationDescription: formData.locationDescription,
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

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, handleCloseForm })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}