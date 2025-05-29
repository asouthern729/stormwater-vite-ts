import { useCallback, useContext } from 'react'
import { useQueryClient } from 'react-query'
import { useForm, useFormContext } from 'react-hook-form'
import { useEnableQuery } from '@/helpers/hooks'
import { errorPopup } from '@/utils/Toast/Toast'
import { handleCreateViolation } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import EnforcementCtx from '@/components/enforcement/context'

export const useCreateViolationForm = (site: AppTypes.SiteInterface, date: string) => { // CreateViolationForm useForm
  const violationDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site?.siteId,
      date: violationDate,
      details: '',
      enforcementAction: null,
      penaltyDate: '',
      penaltyAmount: null,
      penaltyDueDate: '',
      paymentReceived: '',
      swoDate: '',
      swoLiftedDate: '',
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

export const useCreateViolationFormContext = () => { // CreateViolationForm context
  const methods = useFormContext<AppTypes.ConstructionViolationCreateInterface>()

  return methods
}

export const useOnCancelBtnClick = () => { // Handle cancel btn click
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type: 'SET_FORM_UUID', payload: '' })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateViolation(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getViolations')
        dispatch({ type: 'SET_FORM_UUID', payload: '' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient])
}