import { useContext } from "react"
import SitesCtx from "../../context"

// Types
import { SiteInterface } from "@/context/App/types"

export const useSetTableData = (sites: SiteInterface[]) => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(SitesCtx)

  let array = sites || []

  if(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    array = array.filter(site => { // Search by name, cof #, or permit #
      for(const prop in site) {
        if(['name', 'cof', 'permit'].includes(prop) && regex.test(site[prop])) {
          return true
        }
      }
    })
  }

  if(showActiveSitesOnly) { // Show active sites only filter
    array = array.filter(site => !site.inactive)
  }

  if(showOpenIssuesOnly) { // Show open issues only filter
    array = array.filter(site => {
      if(site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation) {
        return site
      }
    })
  }

  return array
}