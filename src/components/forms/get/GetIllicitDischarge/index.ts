import { useQuery } from "react-query"
import { getIllicitDischarge } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetIllicitDischargeResponse } from "../../../../context/App/types"

export const useGetIllicitDischarge = (uuid: string | undefined): UseQueryResult<GetIllicitDischargeResponse> => { // Get illicit discharge
  return useQuery(['getIllicitDischarge', uuid], () => getIllicitDischarge(uuid || ''), { enabled: !!uuid })
}