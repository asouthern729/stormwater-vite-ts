import { useQuery } from "react-query"
import { getComplaints } from "../../context/App/AppActions"

export const useGetComplaints = (validated: boolean) => { // Get complaints that are not associated with a site
  return useQuery('getComplaints', () => getComplaints(), { enabled: validated })
}