// Types
import { SiteForm } from "../../../site/containers/SiteContainer/types"
import { HandlePageBtnClickProps } from "./types"

export const handleNextPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle next page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
}

export const handlePrevPageBtnClick = (setState: HandlePageBtnClickProps['setState']): void => { // Handle prev page btn click
  setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))
}

export const setFormType = (issue: { violationId?: string, complaintId?: string, illicitId?: string }): SiteForm => { // Set form type for issues tables
  if(issue.complaintId) { // Complaint
    return 'updateSiteComplaint'
  }

  if(issue.illicitId) { // Illicit discharge
    return 'updateIllicitDischarge' 
  }

  return 'updateSiteConstructionViolation'
}