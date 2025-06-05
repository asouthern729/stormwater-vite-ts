import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateIllicitDischarge } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { StreamWatershedEnum } from "../../create/CreateIllicitDischargeForm/types"

export const useUpdateIllicitDischargeForm = (illicitDischarge: AppTypes.IllicitDischargeInterface) => {
  const setStreamWatershed = useSetStreamWatershed(illicitDischarge.streamWatershed) 

  return useForm<AppTypes.IllicitDischargeCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...illicitDischarge,
      date: formatDate(illicitDischarge.date),
      streamWatershed: setStreamWatershed,
      otherStreamWatershed: setStreamWatershed === 'Other' ? illicitDischarge.streamWatershed : '',
      penaltyDate: formatDate(illicitDischarge.penaltyDate),
      penaltyDueDate: formatDate(illicitDischarge.penaltyDueDate),
      paymentReceived: formatDate(illicitDischarge.paymentReceived),
      FollowUpDates: illicitDischarge.FollowUpDates?.map(followup => ({
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

  return useCallback((formData: AppTypes.IllicitDischargeCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateIllicitDischarge(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getIllicitDischarges')
        dispatch({ type: 'SET_FORM_UUID', payload: '' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient])
}

const useSetStreamWatershed = (streamWatershed: StreamWatershedEnum | string) => {
  if(streamWatershed in StreamWatershedEnum) {
    return streamWatershed as StreamWatershedEnum
  } else return 'Other'
}