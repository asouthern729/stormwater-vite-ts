import { useForm, UseFormReturn } from "react-hook-form"
import { handleSuccessfulFormSubmit, setDateForForm } from "../../../../helpers"
import { updateIllicitDischarge, createFollowUp } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { IllicitDischarge, IllicitObj, FollowUpObj } from "../../../../context/App/types"
import { StreamWatershed } from "../../create/CreateSiteIllicitDischargeForm/types"
import { UpdateSiteIllicitDischargeFormUseForm, UseUpdateSiteIllicitDischargeFormProps, HandleUpdateSiteIllicitDischargeFormSubmitProps, HandleRequiredFieldValidationProps } from './types'

export const useUpdateSiteIllicitDischargeForm = (illicitDischarge: UseUpdateSiteIllicitDischargeFormProps['illicitDischarge']): UseFormReturn<UpdateSiteIllicitDischargeFormUseForm> => { // UpdateSiteIllicitDischargeForm useForm
  return useForm<UpdateSiteIllicitDischargeFormUseForm>({
    defaultValues: {
      siteId: illicitDischarge.siteId as string,
      date: setDateForForm(illicitDischarge.date),
      xCoordinate: illicitDischarge.xCoordinate,
      yCoordinate: illicitDischarge.yCoordinate,
      inspectorId: illicitDischarge.inspectorId,
      details: illicitDischarge.details,
      volumeLost: illicitDischarge.volumeLost,
      streamWatershed: setStreamWatershed(illicitDischarge),
      otherStreamWatershed: setStreamWatershed(illicitDischarge) === 'Other' ? illicitDischarge.streamWatershed : null,
      enforcementAction: illicitDischarge.enforcementAction,
      penaltyDate: setDateForForm(illicitDischarge.penaltyDate),
      penaltyAmount: illicitDischarge.penaltyAmount,
      penaltyDueDate: setDateForForm(illicitDischarge.penaltyDueDate),
      paymentReceived: setDateForForm(illicitDischarge.paymentReceived),
      compliance: illicitDischarge.compliance,
      closed: illicitDischarge.closed,
      uuid: illicitDischarge.uuid
    }
  })
}

export const handleUpdateSiteIllicitDischargeFormSubmit = async (formData: HandleUpdateSiteIllicitDischargeFormSubmitProps['formData'], options: HandleUpdateSiteIllicitDischargeFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, resetState } = options

  const illicitObj: IllicitObj = {
    illicitId: formData.illicitId,
    siteId: formData.siteId,
    date: formData.date,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    inspectorId: formData.inspectorId || null,
    details: formData.details,
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

    handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}

const setStreamWatershed = (illicitDischarge: IllicitDischarge): string => { // Set streamWatershed
  const options = Object.values(StreamWatershed)

  const streamWatershed = illicitDischarge.streamWatershed

  if(streamWatershed && options.find(option => option === streamWatershed)) {
    return streamWatershed
  } else return 'Other'
}