import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { handleCreateSite } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'
import { errorPopup } from "@/utils/Toast/Toast"

export const useCreateSiteForm = () => { // CreateSiteForm useForm state

  return useForm<AppTypes.SiteCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      inspectorId: '',
      name: '',
      preconDate: '',
      location: '',
      xCoordinate: undefined,
      yCoordinate: undefined,
      permit: '',
      cof: '',
      tnq: '',
      greenInfrastructure: null,
      SiteContacts: [],
    }
  })
}

export const useCreateSiteFormContext = () => { // CreateSiteForm context
  const methods = useFormContext<AppTypes.SiteCreateInterface>()

  return methods
}

export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/sites')
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteCreateInterface) => {
    if(!enabled || !token) return 

    handleCreateSite(formData, token)
      .then(uuid => {
        queryClient.invalidateQueries('getSites')
        navigate(`/sites/site/${ uuid }`)
      })
      .catch(err => errorPopup(err))
  }, [queryClient, navigate, enabled, token])
}