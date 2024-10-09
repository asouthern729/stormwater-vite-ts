import { useQuery } from "react-query"
import { getSites } from "../../context/App/AppActions"

export const useGetSites = () => { // Get sites
  return useQuery('getSites', () => getSites())
}