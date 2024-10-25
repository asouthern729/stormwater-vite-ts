import { useQuery } from "react-query"
import { getViolation } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetViolationResponse } from "../../../../context/App/types"

export const useGetViolation = (uuid: string | undefined, validated: boolean): UseQueryResult<GetViolationResponse> => { // Get construction violation
  return useQuery(['getViolation', uuid], () => getViolation(uuid as string), { enabled: !!uuid && validated })
}