import { useQuery } from "react-query"
import { getIllicitDischarges } from "../../context/App/AppActions"

export const useGetDischarges = (validated: boolean) => { // Get illicit discharges - no associated site
  return useQuery('getIllicitDischarges', () => getIllicitDischarges(), { enabled: validated })
}