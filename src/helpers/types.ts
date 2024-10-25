// Types
import { Dispatch, SetStateAction, RefObject } from 'react'
import { UseFormSetValue } from "react-hook-form"
import { ServerResponse, Contact } from '../context/App/types'
import { CreateSiteFormUseForm } from "../components/forms/create/CreateSiteForm/types"
import { UpdateSiteFormUseForm } from "../components/forms/update/UpdateSiteForm/types"
import { ComplaintsContainerState } from '../components/containers/ComplaintsContainer/types'
import { ViolationsContainerState } from '../components/containers/ViolationsContainer/types'
import { ContactsContainerState } from '../components/containers/ContactsContainer/types'
import { Issue } from '../components/tables/SiteIssuesTable/types'

export interface UseHandleMapChangeProps { // useHandleMapChange hook props
  coordinates: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  options: {
    setValue: UseFormSetValue<CreateSiteFormUseForm|UpdateSiteFormUseForm>
  }
}

export interface UseScrollToFormRefProps { // useScrollToFormRef hook props
  state: ComplaintsContainerState | ViolationsContainerState | ContactsContainerState
  formRef: RefObject<HTMLDivElement>
}

export interface UseHandlePageData { // useHandlePageData hook props
  tableData: Issue[] | Contact[]
  currentPage: number
}

export interface HandleSuccessfulFormSubmitProps { // handleSuccessfulFormSubmit fn props
  msg: string
  options: {
    invalidateQuery: () => Promise<void>
    navigate?: () => void
    resetState?: () => void
  }
}

export interface HandleDeleteBtnClickProps { // handleDeleteBtn fn props
  uuid: string
  deleteBtnActive: boolean
  deleteFn: (uuid: string) => Promise<ServerResponse>
  options: {
    invalidateQuery: () => Promise<void>
    setState?: Dispatch<SetStateAction<{ deleteBtnActive: boolean, formUUID?: string | undefined }>>
    resetState?: () => void
  }
}

export interface HandleIssuesTableRowClickProps { // handleIssuesTableRowClick fn props
  setState: Dispatch<SetStateAction<{ formUUID: string | undefined }>>
}