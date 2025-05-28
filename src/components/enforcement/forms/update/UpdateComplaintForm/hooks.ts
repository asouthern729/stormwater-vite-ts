import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateComplaint } from './utils'

// Types
import { ComplaintInterface, ComplaintCreateInterface } from "@/context/App/types"

export const useUpdateComplaintForm = (complaint: ComplaintInterface) => {

  return useForm<ComplaintCreateInterface>({
    defaultValues: {
      ...complaint,
      FollowUpDates: complaint.FollowUpDates
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: ComplaintCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateComplaint(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getComplaints')
        dispatch({ type: 'SET_FORM_UUID', payload: '' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient])
}