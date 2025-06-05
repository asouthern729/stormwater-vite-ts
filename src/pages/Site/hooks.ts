import { useParams } from "react-router"
import { useQuery } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

export const useGetSite = () => { // Get site data by uuid
  const { uuid } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return useQuery(['getSite', uuid], () => AppActions.getSite(uuid as string, authHeaders(token)), { enabled: enabled && !!uuid })
}