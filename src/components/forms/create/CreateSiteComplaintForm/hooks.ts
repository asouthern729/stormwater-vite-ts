import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import { handleCreateSiteComplaintFormSubmit } from './utils'

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdateSiteComplaintFormUseForm } from "../../update/UpdateSiteComplaintForm/types"
import { UseCreateSiteComplaintFormProps, UseHandleMapChangeProps, CreateSiteComplaintFormUseForm } from "./types"

export const useCreateSiteComplaintForm = (site: UseCreateSiteComplaintFormProps['site'], date: UseCreateSiteComplaintFormProps['date']): UseFormReturn<CreateSiteComplaintFormUseForm> => { // CreateSiteComplaintForm useForm
  const complaintDate: string = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

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
      locationDescription: null,
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

export const useCreateSiteComplaintFormContext = (): UseFormReturn<CreateSiteComplaintFormUseForm|UpdateSiteComplaintFormUseForm> => { // CreateSiteComplaintForm context
  const methods = useFormContext<CreateSiteComplaintFormUseForm|UpdateSiteComplaintFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (uuid: string, handleCloseForm: (() => void) | undefined) => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateSiteComplaintFormUseForm) => 
    handleCreateSiteComplaintFormSubmit(formData, uuid, {
      invalidateQuery: () => queryClient.invalidateQueries(['getSite', uuid]),
      handleCloseForm,
      navigate
    })
  , [queryClient, handleCloseForm, navigate, uuid])
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