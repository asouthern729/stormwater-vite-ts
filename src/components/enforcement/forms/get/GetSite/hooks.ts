import { useContext } from "react"
import { useQuery } from "react-query"
import { useFormContext } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export const useGetActiveSiteNames = () => { // Get active site names
  const { enabled, token } = useEnableQuery()

  return useQuery('getActiveSiteName', () => AppActions.getActiveSiteNames(authHeaders(token)), { enabled })
}

export const useOnSiteSelect = () => { // Handle site selection 
  const { dispatch } = useContext(EnforcementCtx)

  return (e: React.ChangeEvent<HTMLSelectElement>) => dispatch({ type: 'SET_SELECTED_SITE', payload: e.currentTarget.value })
}

export const useGetSelectedSite = () => {
  const { selectedSite } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const results = useQuery(['getSite', selectedSite], () => AppActions.getSite(selectedSite, authHeaders(token)), { enabled: enabled && !!selectedSite })

  if(results.isSuccess) {
    return results.data.data
  }
}

export const useHandleNoSiteBtn = () => {
  const { setValue } = useFormContext<AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  // TODO adjust this form state setting function

  return () => setValue('siteId', null, { shouldValidate: true, shouldDirty: true })
}