import { useCallback, useContext } from "react"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateIllicitDischarge } from './utils'

// Types
import { IllicitDischargeInterface, IllicitDischargeCreateInterface } from "@/context/App/types"

export const useUpdateIllicitDischargeForm = (illicitDischarge: IllicitDischargeInterface) => { 
  return useForm<IllicitDischargeCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...illicitDischarge,
      otherStreamWatershed: illicitDischarge.streamWatershed === 'Other' ? illicitDischarge.streamWatershed : ''
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: IllicitDischargeCreateInterface) => {
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