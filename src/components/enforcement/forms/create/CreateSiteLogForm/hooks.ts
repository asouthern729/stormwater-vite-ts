import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreateSiteLog } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateSiteLogForm = (siteId: string) => { // CreateSiteLogForm useForm
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId,
      inspectionDate: formatDate(formDate)
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)
  // TODO verify hook
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    handleCreateSiteLog(formData, token)
      .then(() => {
        queryClient.invalidateQueries(['getSite', siteUUID])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch, siteUUID])
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}