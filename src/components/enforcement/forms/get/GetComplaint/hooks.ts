import { useContext } from "react"
import { useQuery } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"

export const useGetComplaint = () => { // Get complaint
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getComplaint', formUUID], () => AppActions.getComplaint(formUUID as string, authHeaders(token)), { enabled: enabled && !!formUUID })
}