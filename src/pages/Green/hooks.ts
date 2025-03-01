import { useQuery } from "react-query"
import { useValidateUser, useEnableQuery } from "../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetGreenViolationsResponse } from "../../context/App/types"
import { getGreenViolations } from "../../context/App/AppActions"

export const useGetGreenViolations = (): UseQueryResult<GetGreenViolationsResponse> => { // Get green infrastructure violations
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getGreenViolations', () => getGreenViolations(), { enabled })
}