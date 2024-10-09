// Types
import { ReactNode } from "react"
import { GetSitesResponse, GetSiteResponse, GetViolationsResponse } from "../../context/App/types"

export interface HandleLoadingProps { // HandleLoading props
  children: ReactNode
  data: GetSitesResponse | GetSiteResponse | GetViolationsResponse | undefined
}