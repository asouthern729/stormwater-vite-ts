import { useQuery } from "react-query"
import { getSiteLog } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetSiteLogResponse } from "../../../../context/App/types"

export const useGetSiteLog = (uuid: string | undefined): UseQueryResult<GetSiteLogResponse> => { // Get site log
  return useQuery(['getSiteLog', uuid], () => getSiteLog(uuid || ''), { enabled: !!uuid })
}