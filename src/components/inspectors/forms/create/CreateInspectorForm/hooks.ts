import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreateInspectorFormSubmit } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateInspectorForm = () => { // CreateInspectorForm useForm

  return useForm<AppTypes.InspectorCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: ''
    }
  })
}

export const useCreateInspectorFormContext = () => { // CreateInspectorForm context
  const methods = useFormContext<AppTypes.InspectorCreateInterface>()

  return methods
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.InspectorCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateInspectorFormSubmit(formData, token)
      .then(slug => {
        queryClient.invalidateQueries('getInspectors')
        navigate(`/inspectors/${ slug }`)
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, navigate])
}