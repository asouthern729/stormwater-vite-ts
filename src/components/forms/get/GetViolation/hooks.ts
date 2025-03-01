import { useQuery } from "react-query"
import { getViolation } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetViolationResponse } from "../../../../context/App/types"

export const useGetViolation = (uuid: string | undefined): UseQueryResult<GetViolationResponse> => { // Get construction violation
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getViolation', uuid], () => getViolation(uuid as string), { enabled: enabled && !!uuid })
}