import { useQuery } from "react-query"
import { authHeaders } from "@/helpers/utils"
import { getSites } from "@/context/App/AppActions"
import { useEnableQuery } from '@helpers/hooks'

export const useGetSites = () => { // Get sites
  const { enabled, token } = useEnableQuery()

  return useQuery('getSites', () => getSites(authHeaders(token)), { enabled })
}