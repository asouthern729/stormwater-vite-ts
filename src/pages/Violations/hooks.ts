import { useQuery } from "react-query"
import { getViolations } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetViolationsResponse } from "../../context/App/types"

export const useGetViolations = (validated: boolean): UseQueryResult<GetViolationsResponse> => { // Get construction violations
  return useQuery('getViolations', () => getViolations(), { enabled: validated })
}