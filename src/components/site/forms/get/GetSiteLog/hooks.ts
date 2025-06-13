import { useState, useContext, useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router"
import SiteCtx from "@/components/site/context"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import { authHeaders } from "@/helpers/utils"

export const useGetSiteLog = () => { // Get site log
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getSiteLog', formUUID], () => AppActions.getSiteLog(formUUID as string, authHeaders(token)), { enabled: enabled && !!formUUID })
}

export const useOnDeleteBtnClick = () => {
  const { dispatch } = useContext(SiteCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { siteUUID } = useContext(SiteCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteSiteLog(siteUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
        queryClient.invalidateQueries(['getSite', uuid])
        dispatch({ type: 'RESET_CTX' })
      } else errorPopup(result.msg)
    }
  }, [state.active, enabled, token, siteUUID, queryClient, uuid, dispatch])

  return { onClick, active: state.active }
}