import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateComplaint } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateComplaintForm = (complaint: AppTypes.ComplaintInterface) => {

  return useForm<AppTypes.ComplaintCreateInterface>({
    defaultValues: {
      ...complaint,
      date: formatDate(complaint.date),
      FollowUpDates: complaint.FollowUpDates?.map(followup => ({
        ...followup,
        followUpDate: formatDate(followup.followUpDate)
      }))
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ComplaintCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateComplaint(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getComplaints')
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch])
}