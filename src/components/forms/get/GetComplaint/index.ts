import { useQuery } from "react-query"
import { getComplaint } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetComplaintResponse } from "../../../../context/App/types"

export const useGetComplaint = (uuid: string | undefined, validated: boolean): UseQueryResult<GetComplaintResponse> => { // Get complaint
  return useQuery(['getComplaint', uuid], () => getComplaint(uuid as string), { enabled: !!uuid && validated })
}