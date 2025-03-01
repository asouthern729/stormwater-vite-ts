import { useQuery } from "react-query"
import { getFollowUp } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetFollowUpResponse } from "../../../../context/App/types"

export const useGetFollowUp = (uuid: string | undefined): UseQueryResult<GetFollowUpResponse> => { // Get follow up
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getFollowUp', uuid], () => getFollowUp(uuid as string), { enabled: enabled && !!uuid })
}