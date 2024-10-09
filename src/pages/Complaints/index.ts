import { useQuery } from "react-query"
import { getComplaints } from "../../context/App/AppActions"

export const useGetComplaints = () => { // Get complaints that are not associated with a site
  return useQuery('getComplaints', () => getComplaints())
}