import { useQuery } from "react-query"
import { getFollowUp } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetFollowUpResponse } from "../../../../context/App/types"

export const useGetFollowUp = (uuid: string | undefined): UseQueryResult<GetFollowUpResponse> => { // Get follow up
  return useQuery(['getFollowUp', uuid], () => getFollowUp(uuid as string), { enabled: !!uuid })
}