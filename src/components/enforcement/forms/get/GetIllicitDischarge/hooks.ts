import { useState, useCallback, useContext } from "react"
import { useQuery, useQueryClient } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { getIllicitDischarge, deleteIllicitDischarge } from "@/context/App/AppActions"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useGetIllicitDischarge = (uuid: string | undefined) => { // Get illicit discharge
  const { enabled, token } = useEnableQuery()

  return useQuery(['getIllicitDischarge', uuid], () => getIllicitDischarge(uuid as string, authHeaders(token)), { enabled: enabled && !!uuid })
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
      const result = await deleteIllicitDischarge(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getViolations')
    }
  }, [state.active, enabled, token, formUUID, queryClient])

  return { handleClick, active: state.active }
}