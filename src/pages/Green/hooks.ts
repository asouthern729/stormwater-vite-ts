import { useQuery } from "react-query"

// Types
import { UseQueryResult } from "react-query"
import { GetGreenViolationsResponse } from "../../context/App/types"
import { getGreenViolations } from "../../context/App/AppActions"

export const useGetGreenViolations = (validated: boolean): UseQueryResult<GetGreenViolationsResponse> => { // Get green infrastructure violations
  return useQuery('getGreenViolations', () => getGreenViolations(), { enabled: validated })
}