// Types
import { Dispatch, ChangeEvent, SetStateAction } from "react"
import { CreateForm } from "../../../../../pages/CreateRouting/types"

export interface GetSiteProps { // GetSite props
  form: CreateForm
}

export interface GetSiteState { // GetSite state object
  siteId: string | null | undefined
}

export interface SetCreateFormProps { // setCreateForm fn props
  form: CreateForm
  site: { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined
  options: {
    navigate: () => void
  }
}

export interface HandleSiteSelectProps { // handleSiteSelect fn props
  event: ChangeEvent<HTMLSelectElement>
  options: {
    setState: Dispatch<SetStateAction<GetSiteState>>
  }
}