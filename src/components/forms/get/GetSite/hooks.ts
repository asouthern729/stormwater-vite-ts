import { useQuery } from "react-query"
import { getActiveSiteNames } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetActiveSiteNamesResponse } from "../../../../context/App/types"

export const useGetActiveSiteNames = (validated: boolean): UseQueryResult<GetActiveSiteNamesResponse> => { // Get active site names
  return useQuery('getActiveSiteName', () => getActiveSiteNames(), { enabled: validated })
}