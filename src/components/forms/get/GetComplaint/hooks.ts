import { useQuery } from "react-query"
import { getComplaint } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetComplaintResponse } from "../../../../context/App/types"

export const useGetComplaint = (uuid: string | undefined): UseQueryResult<GetComplaintResponse> => { // Get complaint
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getComplaint', uuid], () => getComplaint(uuid as string), { enabled: enabled && !!uuid })
}