import { useQuery } from "react-query"
import { getIllicitDischarges } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers"

export const useGetDischarges = () => { // Get illicit discharges - no associated site
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery('getIllicitDischarges', () => getIllicitDischarges(), { enabled })
}