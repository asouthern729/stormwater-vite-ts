import { useQuery } from "react-query"
import { getInspector } from "../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetInspectorResponse } from "../../context/App/types"
import { UseGetInspectorProps } from "./types"

export const useGetInspector = (slug: UseGetInspectorProps['slug']): UseQueryResult<GetInspectorResponse> => { // Get inspector by slug
  return useQuery(['getInspector', slug], () => getInspector(slug || ''), { enabled: !!slug })
}