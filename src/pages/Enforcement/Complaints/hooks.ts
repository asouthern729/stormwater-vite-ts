import { useQuery } from "react-query"
import { getComplaints } from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "../../../helpers/hooks"

export const useGetComplaints = () => { // Get complaints
  const { enabled, token } = useEnableQuery()

  return useQuery('getComplaints', () => getComplaints(authHeaders(token)), { enabled })
}