import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreateSiteLog } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateSiteLogForm = (siteId: string) => { // CreateSiteLogForm useForm
  const { formDate } = useContext(SiteCtx)

  const logDate = formDate ? new Date(formDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId,
      inspectionDate: logDate
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    handleCreateSiteLog(formData, token)
      .then(_ => queryClient.invalidateQueries(['getSite', formData.uuid]))
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient])
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(SiteCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}