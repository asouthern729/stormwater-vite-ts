import { useContext, useState, useCallback } from "react"
import { useQuery, useQueryClient } from "react-query"
import ContactsCtx from "@/components/contacts/context"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useGetContact = () => { // Get contact
  const { formUUID } = useContext(ContactsCtx)

  const { enabled, token } = useEnableQuery()
  
  return useQuery(['getContact', formUUID], () => AppActions.getContact(formUUID, authHeaders(token)), { enabled: enabled && !!formUUID })
}

export const useHandleDeleteBtnClick = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID } = useContext(ContactsCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const handleClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteContact(formUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getContacts')
    }
  }, [state.active, enabled, token, formUUID, queryClient])

  return { handleClick, active: state.active }
}