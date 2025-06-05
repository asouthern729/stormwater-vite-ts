import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetDischarges = () => { // Get illicit discharges - no associated site
  const { enabled, token } = useEnableQuery()

  return useQuery('getIllicitDischarges', () => AppActions.getIllicitDischarges(authHeaders(token)), { enabled })
}