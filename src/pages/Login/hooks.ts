import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useValidateUser } from "../../helpers/hooks"

export const useRedirectAuthenticated = () => { // Redirect authenticated users
  const { isAuthenticated, isLoading } = useValidateUser()

  const authenticated = isAuthenticated && !isLoading

  const navigate = useNavigate()

  useEffect(() => {
    if(authenticated) {
      navigate("/")
    }
  }, [authenticated])
}