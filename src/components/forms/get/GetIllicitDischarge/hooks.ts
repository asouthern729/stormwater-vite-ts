import { useQuery } from "react-query"
import { getIllicitDischarge } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetIllicitDischargeResponse } from "../../../../context/App/types"

export const useGetIllicitDischarge = (uuid: string | undefined): UseQueryResult<GetIllicitDischargeResponse> => { // Get illicit discharge
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getIllicitDischarge', uuid], () => getIllicitDischarge(uuid || ''), { enabled: enabled && !!uuid })
}