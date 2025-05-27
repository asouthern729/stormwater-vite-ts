import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import { setDateForForm } from "../../../../../helpers/hooks"
import { setContacts, handleUpdateSiteFormSubmit } from "./utils"

// Types
import { UseFormReturn } from "react-hook-form"
import { Site } from "../../../../../context/App/types"
import { UpdateSiteFormUseForm } from "./types"

export const useUpdateSiteForm = (site: Site): UseFormReturn<UpdateSiteFormUseForm> => { // UpdateSiteForm useForm state
  return useForm<UpdateSiteFormUseForm>({
    defaultValues: {
      name: site.name,
      location: site.location,
      xCoordinate: site.xCoordinate,
      yCoordinate: site.yCoordinate,
      inspectorId: site.inspectorId,
      preconDate: setDateForForm(site.preconDate),
      permit: site.permit,
      cof: site.cof,
      tnq: site.tnq,
      greenInfrastructure: site.greenInfrastructure,
      inactive: site.inactive,
      primaryContact: setContacts(site.SiteContacts).primary,
      contractors: setContacts(site.SiteContacts).contractors,
      siteInspectors: setContacts(site.SiteContacts).siteInspectors,
      otherContacts: setContacts(site.SiteContacts).otherContacts,
      uuid: site.uuid
    }
  })
}

export const useUpdateSiteFormContext = (): UseFormReturn<UpdateSiteFormUseForm> => { // UpdateSiteForm context
  const methods = useFormContext<UpdateSiteFormUseForm>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return useCallback((formData: UpdateSiteFormUseForm) => 
    handleUpdateSiteFormSubmit(formData, {
      invalidateQuery: () => queryClient.invalidateQueries('getSites'),
      navigate: () => navigate('/')
    }),[queryClient, navigate]
  )
}