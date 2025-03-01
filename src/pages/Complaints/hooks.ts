import { useQuery } from "react-query"
import { getComplaints } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

export const useGetComplaints = () => { // Get complaints that are not associated with a site
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getComplaints', () => getComplaints(), { enabled })
}