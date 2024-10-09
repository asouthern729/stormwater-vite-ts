// Types
import { QueryClient } from "react-query"
import { NavigateFunction } from "react-router-dom"
import { SiteContactObj } from "../../../../context/App/types"

export interface CreateSiteFormUseForm {
  name: string
  location: string
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  inspectorId: string | null
  preconDate: string
  permit: string | null
  cof: string | null
  tnq: string | null
  greenInfrastructure: boolean | string | null
  inactive: boolean | string | null
  primaryContact: string | null
  contractors: string[]
  siteInspectors: string[]
  otherContacts: string[]
  uuid: string
}

export interface HandleCreateSiteFormSubmitProps { // handleCreateSiteFormSubmit fn props
  formData: CreateSiteFormUseForm
  options: {
    invalidateQuery: Promise<void>
    navigate: void
  }
}

export interface AddContactProps { // addContact helper fn props
  contactsArray: SiteContactObj[]
  siteId: string
  contactId: string
  options: {
    isPrimary: boolean | null
    isContractor: boolean | null
    isInspector: boolean | null
  }
}