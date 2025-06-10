import { useCallback, useContext } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleUpdateSite } from "./utils"
import { errorPopup } from "@/utils/Toast/Toast"

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
  const { dispatch } = useContext(SiteCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateSite(formData, token)
      .then(_ => {
        queryClient.invalidateQueries(['getSite', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token])
}