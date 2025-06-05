import { useQuery } from "react-query"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from '@helpers/hooks'

export const useGetSites = () => { // Get sites
  const { enabled, token } = useEnableQuery()

  return useQuery('getSites', () => AppActions.getSites(authHeaders(token)), { enabled, staleTime: 600000 }) // 10 min stale time to prevent unecessary data fetching and rerenders
}