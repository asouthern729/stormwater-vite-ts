import { useContext, useCallback } from "react"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useEnableQuery } from "@/helpers/hooks"
import InspectorCtx from "@/components/inspectors/context"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateInspector } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateInspectorForm = (inspector: AppTypes.InspectorInterface) => { 
  
  return useForm<AppTypes.InspectorInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: inspector.name,
      email: inspector.email,
      inspectorId: inspector.inspectorId,
      uuid: inspector.uuid
    }
  })
}

export const useHandleFormSubmit = () => { // Handle form submit
  // TODO verify hook
  const { dispatch } = useContext(InspectorCtx)

  const { slug } = useParams<{ slug: string}>()

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.InspectorCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateInspector(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getInspectors')
        queryClient.invalidateQueries(['getInspector', slug])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, slug, dispatch])
}