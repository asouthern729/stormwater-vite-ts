import { useQuery } from "react-query"
import { getSites } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

export const useGetSites = () => { // Get sites
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getSites', () => getSites(), { enabled })
}