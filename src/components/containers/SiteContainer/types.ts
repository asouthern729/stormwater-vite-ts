// Types
import { Dispatch, RefObject, SetStateAction } from "react"
import { QueryClient } from "react-query"
import { NavigateFunction } from "react-router-dom"
import { Site } from "../../../context/App/types"

export interface SiteContainerProps { // SiteContainer props
  site: Site
}

export interface SiteContainerState { // SiteContainer state object
  activeForm: SiteForm | null
  formDate: string | undefined
  deleteBtnActive: boolean
  formUUID: string | undefined
}

export interface UseScrollToFormRefProps { // useScrollToFormRef hook props
  state: SiteContainerState
  formRef: RefObject<HTMLDivElement>
}

export interface SetIssuesObjProps { // setIssuesObj fn props
  site: Site
}

export interface SetSiteFormProps { // setSiteForm fn props
  state: SiteContainerState
  site: Site
  options: {
    setState: Dispatch<SetStateAction<SiteContainerState>>
    navigate: NavigateFunction
    queryClient: QueryClient
  }
}

export interface HandleSiteIssuesTableRowClickProps { // handleSiteIssuesTableRowClick fn props
  setState: Dispatch<SetStateAction<SiteContainerState>>
}

export type SiteForm =
  | "updateSite"
  | "createSiteLog"
  | "createSiteConstructionViolation"
  | "createSiteComplaint"
  | "createIllicitDischarge"
  | "updateSiteLog"
  | "updateSiteConstructionViolation"
  | "updateSiteComplaint"
  | "updateIllicitDischarge"