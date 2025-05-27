import { createIllicitDischarge, createFollowUp } from "../../../../../context/App/AppActions"
import { handleSuccessfulFormSubmit } from "../../../../../helpers/hooks"
import { getSite } from "../../../../../context/App/AppActions"
import { errorPopup } from "../../../../../utils/Toast/Toast"

// Types
import { IllicitObj, FollowUpObj } from "../../../../../context/App/types"
import { HandleCreateSiteIllicitDischargeFormSubmitProps } from "./types"

export const handleCreateSiteIllicitDischargeFormSubmit = async (formData: HandleCreateSiteIllicitDischargeFormSubmitProps['formData'], siteUUID: HandleCreateSiteIllicitDischargeFormSubmitProps['siteUUID'], options: HandleCreateSiteIllicitDischargeFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, handleCloseForm, navigate } = options

  let illicitObj

  if(siteUUID) { // Handle discharge with associated site
    const siteData = await getSite(siteUUID)

    if(siteData.success) { // Update form site siteData from API call
      illicitObj = {
        siteId: formData.siteId,
        date: formData.date as string,
        xCoordinate: siteData.data.xCoordinate,
        yCoordinate: siteData.data.yCoordinate,
        locationDescription: formData.locationDescription,
        inspectorId: siteData.data.inspectorId,
        details: formData.details,
        responsibleParty: formData.responsibleParty,
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
      locationDescription: formData.locationDescription,
      inspectorId: formData.inspectorId,
      details: formData.details,
      responsibleParty: formData.responsibleParty,
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
      
      handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, handleCloseForm, navigate: !handleCloseForm ? () => navigate('/') : undefined })
    } else errorPopup(result.msg) // Handle error
  } else errorPopup('Something Went Wrong')
}