import { useContext } from "react"
import { useLocation } from "react-router"
import AppContext from "../../../context/App/AppContext"

export const useSetSitesHeaderLabel = (): string => { // Set label based on location
  const { inspectorOptions } = useContext(AppContext)

  const pathname = useLocation().pathname

  if(pathname === '/') {
    return 'Sites'
  } else {
    const inspectorId = pathname.split('/')[2] // Parse inspectorId

    const inspectorName = inspectorOptions.find(inspector => inspector.value === inspectorId)?.text

    return `${ inspectorName?.split(' ')[0] }'s Sites`
  }
}