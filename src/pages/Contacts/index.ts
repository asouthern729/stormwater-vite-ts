import { useQuery } from "react-query"
import { getContacts } from "../../context/App/AppActions"

// Types
export const useGetContacts = (validated: boolean) => { // Get contacts
  return useQuery('getContacts', () => getContacts(), { enabled: validated })
}