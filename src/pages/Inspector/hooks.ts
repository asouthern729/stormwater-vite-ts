import { useQuery } from "react-query"
import { getInspector } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

// Types
import { UseQueryResult } from "react-query"
import { GetInspectorResponse } from "../../context/App/types"

export const useGetInspector = (inspectorId: string | undefined): UseQueryResult<GetInspectorResponse> => { // Get inspector by inspectorId
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getInspector', inspectorId], () => getInspector(inspectorId || ''), { enabled: enabled && !!inspectorId })
}