import { useState, useCallback, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useGetIllicitDischarge = () => { // Get illicit discharge
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getIllicitDischarge', formUUID], () => AppActions.getIllicitDischarge(formUUID as string, authHeaders(token)), { enabled: enabled && !!formUUID })
}

export const useHandleDeleteBtnClick = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const handleClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteIllicitDischarge(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getViolations')
    }
  }, [state.active, enabled, token, formUUID, queryClient])

  return { handleClick, active: state.active }
}