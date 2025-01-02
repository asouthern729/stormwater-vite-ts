import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateIllicitDischarge, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { IllicitDischarge, IllicitObj, FollowUpObj } from "../../../../context/App/types"
import { StreamWatershed } from "../../create/CreateSiteIllicitDischargeForm/types"
import { HandleUpdateSiteIllicitDischargeFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const handleUpdateSiteIllicitDischargeFormSubmit = async (formData: HandleUpdateSiteIllicitDischargeFormSubmitProps['formData'], options: HandleUpdateSiteIllicitDischargeFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, handleCloseForm } = options

  const illicitObj: IllicitObj = {
    illicitId: formData.illicitId,
    siteId: formData.siteId,
    date: formData.date,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    locationDescription: formData.locationDescription,
    inspectorId: formData.inspectorId || null,
    details: formData.details,
    responsibleParty: formData.responsibleParty,
    volumeLost: formData.volumeLost || null,
    streamWatershed: formData.streamWatershed,
    enforcementAction: formData.enforcementAction || null,
    penaltyDate: formData.penaltyDate || null,
    penaltyAmount: formData.penaltyAmount || null,
    penaltyDueDate: formData.penaltyDueDate || null,
    paymentReceived: formData.paymentReceived || null,
    compliance: formData.compliance,
    closed: formData.closed,
    uuid: formData.uuid
  }

  const result = await updateIllicitDischarge(illicitObj)

  if(result.success) {
    if(formData.followUpDate) { // Handle follow-up date
      const followUpObj: FollowUpObj = {
        followUpDate: formData.followUpDate,
        parentId: formData.uuid
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

export const setStreamWatershed = (illicitDischarge: IllicitDischarge): string => { // Set streamWatershed
  const options = Object.values(StreamWatershed)

  const streamWatershed = illicitDischarge.streamWatershed

  if(streamWatershed && options.find(option => option === streamWatershed)) {
    return streamWatershed
  } else return 'Other'
}