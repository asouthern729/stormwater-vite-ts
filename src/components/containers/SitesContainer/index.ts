import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { Site } from "../../../context/App/types"
import { UseSetSitesDataProps } from "./types"

export const useSetSitesData = (sites: UseSetSitesDataProps['sites']): Site[] => { // Set data for table and map
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(AppContext)

  let sitesArray: Site[] = []

  if(searchValue) {
    const regex = new RegExp(searchValue, 'i')

    sitesArray = sites.filter(obj => {
      for(const prop in obj) {
        if(['name', 'cof', 'permit'].includes(prop) && regex.test(obj[prop] as string)) {
          return true
        }
      }
    })
  } else sitesArray = sites

  sitesArray = !showOpenIssuesOnly ? sitesArray : sitesArray.filter(site => site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge) // Handle open violations filter

  return showActiveSitesOnly ? sitesArray.filter(site => !site.inactive) : sitesArray.filter(site => site.inactive) // Handle active sites only filter
}