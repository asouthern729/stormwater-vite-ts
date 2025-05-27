import { useState, useCallback, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import { getViolation } from "@/context/App/AppActions"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { deleteViolation } from "@/context/App/AppActions"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useGetViolation = (uuid: string | undefined) => { // Get construction violation
  const { enabled, token } = useEnableQuery()

  return useQuery(['getViolation', uuid], () => getViolation(uuid as string, authHeaders(token)), { enabled: enabled && !!uuid })
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
      const result = await deleteViolation(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getViolations')
    }
  }, [state.active, enabled, token, formUUID, queryClient])

  return { handleClick, active: state.active }
}