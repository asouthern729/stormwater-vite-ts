import { useQuery } from "react-query"
import { getGreenViolation } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetGreenViolationResponse } from "../../../../context/App/types"

export const useGetGreenViolation = (uuid: string | undefined): UseQueryResult<GetGreenViolationResponse> => { // Get green violation
  const { isAuthenticated, isLoading } = useValidateUser()
  
  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getGreenViolation', uuid], () => getGreenViolation(uuid as string), { enabled: enabled && !!uuid })
}