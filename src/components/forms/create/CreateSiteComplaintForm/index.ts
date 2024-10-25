import { useCallback, useEffect } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createComplaint, createFollowUp, getSite } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { ComplaintObj, FollowUpObj } from "../../../../context/App/types"
import { UseCreateSiteComplaintFormProps, UseHandleMapChangeProps, CreateSiteComplaintFormUseForm, HandleCreateSiteComplaintFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"
import { Concern } from "./types"

export const useCreateSiteComplaintForm = (site: UseCreateSiteComplaintFormProps['site'], date: UseCreateSiteComplaintFormProps['date']): UseFormReturn<CreateSiteComplaintFormUseForm> => { // CreateSiteComplaintForm useForm
  const complaintDate: string = new Date(date).toISOString().split('T')[0]

  return useForm<CreateSiteComplaintFormUseForm>({
    defaultValues: {
      siteId: site?.siteId || undefined,
      date: complaintDate,
      details: '',
      inspectorId: site?.inspectorId || null,
      name: null,
      address: null,
      phone: null,
      email: null,
      xCoordinate: site?.xCoordinate || undefined,
      yCoordinate: site?.yCoordinate || undefined,
      concern: null,
      otherConcern: null,
      responsibleParty: null,
      comments: null,
      compliance: null,
      closed: null,
      followUpDate: undefined
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
  }, [coordinates, setValue])

  useEffect(() => {
    cb()
  }, [cb])
}

export const handleCreateSiteComplaintFormSubmit = async (formData: HandleCreateSiteComplaintFormSubmitProps['formData'], siteUUID: HandleCreateSiteComplaintFormSubmitProps['siteUUID'], options: HandleCreateSiteComplaintFormSubmitProps['options']): Promise<void> => {
  const { invalidateQuery, resetState, navigate } = options

  let siteComplaintObj

  if(siteUUID) { // Handle complaint with associated site
    const siteData = await getSite(siteUUID)

    if(siteData.success) { // Update form with siteData from API call
      siteComplaintObj = {
        date: formData.date,
        siteId: siteData.data.siteId,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        xCoordinate: siteData.data.xCoordinate,
        yCoordinate: siteData.data.yCoordinate,
        inspectorId: siteData.data.inspectorId,
        concern: formData.concern as Concern,
        otherConcern: formData.otherConcern,
        details: formData.details,
        responsibleParty: formData.responsibleParty,
        comments: formData.comments,
        compliance: formData.compliance,
        closed: formData.closed
      } as ComplaintObj
    } else errorPopup(siteData.msg) // Handle error
  } else { // Handle complaint that is not associated to a site
    siteComplaintObj = {
      date: formData.date,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      xCoordinate: formData.xCoordinate,
      yCoordinate: formData.yCoordinate,
      inspectorId: formData.inspectorId,
      concern: formData.concern as Concern,
      otherConcern: formData.otherConcern,
      details: formData.details,
      responsibleParty: formData.responsibleParty,
      comments: formData.comments,
      compliance: formData.compliance,
      closed: formData.closed
    } as ComplaintObj
  }

  if(siteComplaintObj) {
    const result = await createComplaint(siteComplaintObj)

    if(result.success) {
      if(formData.followUpDate) { // Handle follow-up date
        const followUpObj: FollowUpObj = {
          followUpDate: formData.followUpDate,
          parentId: result.data.complaintId
        }

        const followUpResult = await createFollowUp(followUpObj)

        if(!followUpResult.success) {
          errorPopup(followUpResult.msg)
        }
      } 

      handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState, navigate: !resetState ? () => navigate('/') : undefined })
    } else errorPopup(result.msg) // Handle error
  } else errorPopup('Something Went Wrong')
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}