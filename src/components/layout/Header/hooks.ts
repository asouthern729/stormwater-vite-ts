import { useQuery } from 'react-query'
import { useEnableQuery } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

export const useGetInspectors = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery('getInspectors', () => AppActions.getInspectors(authHeaders(token)), { enabled })
}