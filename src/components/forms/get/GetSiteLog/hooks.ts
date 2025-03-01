import { useQuery } from "react-query"
import { getSiteLog } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetSiteLogResponse } from "../../../../context/App/types"

export const useGetSiteLog = (uuid: string | undefined): UseQueryResult<GetSiteLogResponse> => { // Get site log
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getSiteLog', uuid], () => getSiteLog(uuid || ''), { enabled: enabled && !!uuid })
}