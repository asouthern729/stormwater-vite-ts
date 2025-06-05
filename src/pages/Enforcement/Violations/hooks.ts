import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetViolations = () => { // Get construction violations
  const { enabled, token } = useEnableQuery()

  return useQuery('getViolations', () => AppActions.getViolations(authHeaders(token)), { enabled })
}