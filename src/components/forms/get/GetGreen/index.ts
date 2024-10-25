import { useQuery } from "react-query"
import { getGreenViolation } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetGreenViolationResponse } from "../../../../context/App/types"

export const useGetGreenViolation = (uuid: string | undefined, validated: boolean): UseQueryResult<GetGreenViolationResponse> => { // Get green violation
  return useQuery(['getGreenViolation', uuid], () => getGreenViolation(uuid as string), { enabled: !!uuid && validated })
}