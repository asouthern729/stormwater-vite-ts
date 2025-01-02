import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useForm, UseFormReturn } from "react-hook-form"
import { setDateForForm, useGetSiteUUID } from "../../../../helpers"
import { setStreamWatershed, handleUpdateSiteIllicitDischargeFormSubmit } from './utils'

// Types
import { UpdateSiteIllicitDischargeFormUseForm, UseUpdateSiteIllicitDischargeFormProps } from './types'

export const useUpdateSiteIllicitDischargeForm = (illicitDischarge: UseUpdateSiteIllicitDischargeFormProps['illicitDischarge']): UseFormReturn<UpdateSiteIllicitDischargeFormUseForm> => { // UpdateSiteIllicitDischargeForm useForm
  return useForm<UpdateSiteIllicitDischargeFormUseForm>({
    defaultValues: {
      siteId: illicitDischarge.siteId as string,
      date: setDateForForm(illicitDischarge.date),
      xCoordinate: illicitDischarge.xCoordinate,
      yCoordinate: illicitDischarge.yCoordinate,
      locationDescription: illicitDischarge.locationDescription,
      inspectorId: illicitDischarge.inspectorId,
      details: illicitDischarge.details,
      responsibleParty: illicitDischarge.responsibleParty,
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

export const useHandleFormSubmit = (handleCloseForm: () => void) => { // Handle form submit
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  return useCallback((formData: UpdateSiteIllicitDischargeFormUseForm) => 
    handleUpdateSiteIllicitDischargeFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites'),
      handleCloseForm
    }), [queryClient, handleCloseForm]
  )
}