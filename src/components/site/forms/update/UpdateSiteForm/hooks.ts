import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import { handleUpdateSiteFormSubmit } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateSiteForm = (site: AppTypes.SiteInterface) => { // UpdateSiteForm useForm state

  return useForm<AppTypes.SiteCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: site.name,
      location: site.location,
      xCoordinate: site.xCoordinate,
      yCoordinate: site.yCoordinate,
      inspectorId: site.inspectorId,
      preconDate: site.preconDate,
      permit: site.permit,
      cof: site.cof,
      tnq: site.tnq,
      greenInfrastructure: site.greenInfrastructure,
      inactive: site.inactive,
      SiteContacts: site.SiteContacts,
      uuid: site.uuid
    }
  })
}

export const useUpdateSiteFormContext = () => { // UpdateSiteForm context
  const methods = useFormContext<AppTypes.SiteCreateInterface>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: AppTypes.SiteCreateInterface) => 
    handleUpdateSiteFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries('getSites'),
      navigate: () => navigate('/')
    }),[queryClient, navigate]
  )
}