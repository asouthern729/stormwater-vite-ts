import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleUpdateSiteLog } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateSiteLogForm = (siteLog: AppTypes.SiteLogInterface) => { // UpdateSiteLog useForm

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId: siteLog.siteId,
      inspectionDate: siteLog.inspectionDate,
      uuid: siteLog.uuid
    }
  })
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(SiteCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(SiteCtx)

  const queryClient = useQueryClient()

  const { uuid } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateSiteLog(formData, token)
      .then(_ => {
        queryClient.invalidateQueries(['getSite', uuid])
        dispatch({ type: 'RESET_CTX' })
      })
  }, [enabled, token, dispatch])
}