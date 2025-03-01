import { useQuery } from "react-query"
import { getContacts } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

// Types
export const useGetContacts = () => { // Get contacts
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getContacts', () => getContacts(), { enabled })
}