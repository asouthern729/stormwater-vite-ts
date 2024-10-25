import { useQuery } from "react-query"
import { getSites } from "../../context/App/AppActions"

export const useGetSites = (validated: boolean) => { // Get sites
  return useQuery('getSites', () => getSites(), { enabled: validated })
}