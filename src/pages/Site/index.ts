import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getSite } from "../../context/App/AppActions"

export const useGetSite = () => { // Get site data by uuid
  const { uuid } = useParams()

  return useQuery(['getSite', uuid], () => getSite(uuid || ''), { enabled: !!uuid })
}