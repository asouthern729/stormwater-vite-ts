import { useQuery } from "react-query"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { getContacts } from "@/context/App/AppActions"

export const useGetContacts = () => { // Get contacts
  const { enabled, token } = useEnableQuery()

  return useQuery('getContacts', () => getContacts(authHeaders(token)), { enabled })
}