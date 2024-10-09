// Types
import { Dispatch, SetStateAction } from "react"
import { Site, Complaint } from "../../../context/App/types"

export interface ComplaintsContainerProps { // ComplaintsContainer
  sites: Site[]
  complaints: Complaint[]
}

export interface ComplaintsContainerState { // ComplaintsContainer state
  deleteBtnActive: boolean
  formUUID: string | undefined
}

export interface HandleRowClickProps { // handleRowClick fn props
  setState: Dispatch<SetStateAction<ComplaintsContainerState>>
}