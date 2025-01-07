import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useForm, UseFormReturn, useFormContext } from "react-hook-form"
import { handleCreateSiteIllicitDischargeFormSubmit } from './utils'

// Types
import { CreateSiteIllicitDischargeFormUseForm, UseCreateSiteIllicitDischargeFormProps, UseHandleMapChangeProps } from "./types"

export const useCreateSiteIllicitDischargeForm = (site: UseCreateSiteIllicitDischargeFormProps['site'], date: UseCreateSiteIllicitDischargeFormProps['date']): UseFormReturn<CreateSiteIllicitDischargeFormUseForm> => { // CreateSiteIllicitDischargeForm useForm
  const illicitDate = new Date(date || '').toISOString().split('T')[0]

  return useForm<CreateSiteIllicitDischargeFormUseForm>({
    defaultValues: {
      siteId: site?.siteId || undefined,
      date: illicitDate,
      xCoordinate: site?.xCoordinate || undefined,
      yCoordinate: site?.yCoordinate || undefined,
      locationDescription: null,
      inspectorId: site?.inspectorId || null,
      details: '',
      responsibleParty: null,
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

export const useCreateSiteIllicitDischargeFormContext = (): UseFormReturn<CreateSiteIllicitDischargeFormUseForm> => { // CreateSiteIllicitDischargeForm context
  const methods = useFormContext<CreateSiteIllicitDischargeFormUseForm>()

  return methods
}

export const useHandleFormSubmit = (handleCloseForm: (() => void) | undefined, uuid: string) => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: CreateSiteIllicitDischargeFormUseForm) => 
    handleCreateSiteIllicitDischargeFormSubmit(formData, uuid, {
      invalidateQuery: () => queryClient.invalidateQueries(['getSite', uuid]),
      handleCloseForm,
      navigate
    }), [queryClient, navigate, uuid, handleCloseForm]
  )
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