import { useCallback, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { createIllicitDischarge, createFollowUp } from "../../../../context/App/AppActions"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { getSite } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { IllicitObj, FollowUpObj } from "../../../../context/App/types"
import { CreateSiteIllicitDischargeFormUseForm, UseCreateSiteIllicitDischargeFormProps, UseHandleMapChangeProps, HandleCreateSiteIllicitDischargeFormSubmitProps } from "./types"

export const useCreateSiteIllicitDischargeForm = (site: UseCreateSiteIllicitDischargeFormProps['site'], date: UseCreateSiteIllicitDischargeFormProps['date']): UseFormReturn<CreateSiteIllicitDischargeFormUseForm> => { // CreateSiteIllicitDischargeForm useForm
  const illicitDate = new Date(date).toISOString().split('T')[0]

  return useForm<CreateSiteIllicitDischargeFormUseForm>({
    defaultValues: {
      siteId: site?.siteId,
      date: illicitDate,
      xCoordinate: site?.xCoordinate,
      yCoordinate: site?.yCoordinate,
      inspectorId: null,
      details: '',
      volumeLost: null,
      streamWatershed: null,
      otherStreamWatershed: null,
      enforcementAction: null,
      penaltyDate: undefined,
      penaltyAmount: null,
      penaltyDueDate: undefined,
      paymentReceived: undefined,
      compliance: null,
      closed: null
    }
  })
}

export const useHandleMapChange = (coordinates: UseHandleMapChangeProps['coordinates'], options: UseHandleMapChangeProps['options']): void => { // Update complaint location on map change
  const { setValue } = options

  const cb = useCallback(() => { // Update form state on coordinates change
    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      setValue('xCoordinate', coordinates.xCoordinate, { shouldValidate: false })
      setValue('yCoordinate', coordinates.yCoordinate, { shouldValidate: false })
    }
  }, [coordinates])

  useEffect(() => {
    cb()
  }, [coordinates])
}

export const handleCreateSiteIllicitDischargeFormSubmit = async (formData: HandleCreateSiteIllicitDischargeFormSubmitProps['formData'], siteUUID: HandleCreateSiteIllicitDischargeFormSubmitProps['siteUUID'], options: HandleCreateSiteIllicitDischargeFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, resetState, navigate } = options

  let illicitObj

  if(siteUUID) { // Handle discharge with associated site
    const siteData = await getSite(siteUUID)

    if(siteData.success) { // Update form site siteData from API call
      illicitObj = {
        siteId: formData.siteId,
        date: formData.date as string,
        xCoordinate: siteData.data.xCoordinate,
        yCoordinate: siteData.data.yCoordinate,
        inspectorId: siteData.data.inspectorId,
        details: formData.details,
        volumeLost: formData.volumeLost,
        streamWatershed: formData.otherStreamWatershed || formData.streamWatershed,
        enforcementAction: formData.enforcementAction,
        penaltyDate: formData.penaltyDate || null,
        penaltyAmount: formData.penaltyAmount,
        penaltyDueDate: formData.penaltyDueDate || null,
        paymentReceived: formData.paymentReceived || null,
        compliance: formData.compliance,
        closed: formData.closed
      } as IllicitObj
    } else errorPopup(siteData.msg) // Handle error
  } else { // Handle discharge that is not associated to a site
    illicitObj = {
      siteId: formData.siteId,
      date: formData.date as string,
      xCoordinate: formData.xCoordinate,
      yCoordinate: formData.yCoordinate,
      inspectorId: formData.inspectorId,
      details: formData.details,
      volumeLost: formData.volumeLost,
      streamWatershed: formData.otherStreamWatershed || formData.streamWatershed,
      enforcementAction: formData.enforcementAction,
      penaltyDate: formData.penaltyDate || null,
      penaltyAmount: formData.penaltyAmount,
      penaltyDueDate: formData.penaltyDueDate || null,
      paymentReceived: formData.paymentReceived || null,
      compliance: formData.compliance,
      closed: formData.closed
    } as IllicitObj
  }

  if(illicitObj) {
    const result = await createIllicitDischarge(illicitObj)
    
    if(result.success) {
      if(formData.followUpDate) { // Handle follow-up date
        const followUpObj: FollowUpObj = {
          followUpDate: formData.followUpDate,
          parentId: result.data.illicitId
        }
  
        const followUpResult = await createFollowUp(followUpObj)
  
        if(!followUpResult.success) {
          errorPopup(followUpResult.msg)
        }
      }
      
      handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState, navigate: navigate('/') })
    } else errorPopup(result.msg) // Handle error
  } else errorPopup('Something Went Wrong')
}