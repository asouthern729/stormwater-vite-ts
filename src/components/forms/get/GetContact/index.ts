import { useQuery } from "react-query"
import { getContact } from "../../../../context/App/AppActions"

// Types
import { UseQueryResult } from "react-query"
import { GetContactResponse } from "../../../../context/App/types"

export const useGetContact = (uuid: string | undefined, validated: boolean): UseQueryResult<GetContactResponse> => { // Get contact
  return useQuery(['getContact', uuid], () => getContact(uuid as string), { enabled: !!uuid && validated })
}