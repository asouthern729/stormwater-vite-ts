import { useState, useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router"
import SiteCtx from "../../context"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useOnDeleteBtnClick = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID } = useContext(SiteCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteSite(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getSites')
      navigate('/sites')
    }
  }, [state.active, enabled, token, formUUID, queryClient, navigate])

  return { onClick, active: state.active }
}