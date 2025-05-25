import { useQuery } from "react-query"
import { getContact } from "../../../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../../../helpers/hooks"

// Types
import { UseQueryResult } from "react-query"
import { GetContactResponse } from "../../../../context/App/types"

export const useGetContact = (uuid: string | undefined): UseQueryResult<GetContactResponse> => { // Get contact
  const { isAuthenticated, isLoading } = useValidateUser()
  
  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getContact', uuid], () => getContact(uuid as string), { enabled: enabled && !!uuid })
}