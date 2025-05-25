import { useParams } from "react-router"
import { useQuery } from "react-query"
import { getSite } from "../../context/App/AppActions"
import { useValidateUser, useEnableQuery } from "../../helpers/hooks"

export const useGetSite = () => { // Get site data by uuid
  const { isAuthenticated, isLoading } = useValidateUser()

  const { uuid } = useParams()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  return useQuery(['getSite', uuid], () => getSite(uuid || ''), { enabled: enabled && !!uuid })
}