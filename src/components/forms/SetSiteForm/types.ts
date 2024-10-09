// Types
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { QueryClient } from 'react-query'
import { Site } from "../../../context/App/types"
import { SiteContainerState } from "../../containers/SiteContainer/types"

export interface SetSiteFormProps { // SetSiteForm props
  state: SiteContainerState
  site: Site
  setState: Dispatch<SetStateAction<SiteContainerState>>
}

export interface SetFormProps { // setForm fn props
  state: SiteContainerState
  site: Site
  options: {
    setState: Dispatch<SetStateAction<SiteContainerState>>
    queryClient: QueryClient
    navigate?: NavigateFunction
  }
}

export interface HandleFormProps { // handleForm fn props
  state: SiteContainerState
  site: Site
  options: {
    setState: Dispatch<SetStateAction<SiteContainerState>>
  }
}

export interface HandleDeleteSiteBtnClickProps { // handleDeleteSiteBtnClick fn props
  uuid: string
  deleteBtnActive: boolean
  options: {
    setState: Dispatch<SetStateAction<SiteContainerState>>
    navigate: NavigateFunction
    queryClient: QueryClient
  }
}