import { useQuery } from "react-query"
import { getInspector } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetInspectorResponse } from "../../context/App/types"
import { UseGetInspectorProps } from "./types"

export const useGetInspector = (inspectorId: UseGetInspectorProps['inspectorId'], validated: UseGetInspectorProps['validated']): UseQueryResult<GetInspectorResponse> => { // Get inspector by inspectorId
  return useQuery(['getInspector', inspectorId], () => getInspector(inspectorId || ''), { enabled: !!inspectorId && validated })
}