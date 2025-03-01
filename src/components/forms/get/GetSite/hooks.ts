import { useQuery } from "react-query"
import { getActiveSiteNames } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetActiveSiteNamesResponse } from "../../../../context/App/types"

export const useGetActiveSiteNames = (): UseQueryResult<GetActiveSiteNamesResponse> => { // Get active site names
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getActiveSiteName', () => getActiveSiteNames(), { enabled })
}