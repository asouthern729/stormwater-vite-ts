import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { formatDate } from "@/helpers/utils"
import { handleUpdateSiteLog } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateSiteLogForm = (siteLog: AppTypes.SiteLogInterface) => { // UpdateSiteLog useForm

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId: siteLog.siteId,
      inspectionDate: formatDate(siteLog.inspectionDate),
      uuid: siteLog.uuid
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateSiteLog(formData, token)
      .then(() => {
        queryClient.invalidateQueries(['getSite', siteUUID])
        dispatch({ type: 'RESET_CTX' })
      })
  }, [enabled, token, dispatch, queryClient, siteUUID])
}