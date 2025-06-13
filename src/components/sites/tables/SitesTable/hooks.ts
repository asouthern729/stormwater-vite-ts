import { useNavigate } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"

export const useOnTableRowClick = (uuid: string) => {
  const navigate = useNavigate()

  const roles = useReturnUserRoles()

  if(!roles.includes('[task.write]')) {
    return () => null
  }

  return () => navigate(`/site/${ uuid }`)
}