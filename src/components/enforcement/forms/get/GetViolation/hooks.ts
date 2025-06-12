import { useContext } from "react"
import { useQuery } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetViolation = () => { // Get construction violation
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getViolation', formUUID], () => AppActions.getViolation(formUUID as string, authHeaders(token)), { enabled: enabled && !!formUUID })
}