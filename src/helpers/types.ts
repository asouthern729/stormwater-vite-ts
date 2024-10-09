// Types
import { Dispatch, SetStateAction, RefObject } from 'react'
import { UseFormSetValue } from "react-hook-form"
import { ServerResponse } from '../context/App/types'
import { GetSiteLogState } from "../components/forms/get/GetSiteLog/types"
import { GetViolationState } from '../components/forms/get/GetViolation/types'
import { CreateSiteFormUseForm } from "../components/forms/create/CreateSiteForm/types"
import { UpdateSiteFormUseForm } from "../components/forms/update/UpdateSiteForm/types"
import { ComplaintsContainerState } from '../components/containers/ComplaintsContainer/types'

export interface UseHandleMapChangeProps { // useHandleMapChange hook props
  coordinates: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  options: {
    setValue: UseFormSetValue<CreateSiteFormUseForm|UpdateSiteFormUseForm>
  }
}

export interface UseScrollToFormRefProps { // useScrollToFormRef hook props
  state: ComplaintsContainerState
  formRef: RefObject<HTMLDivElement>
}

export interface HandleSuccessfulFormSubmitProps { // handleSuccessfulFormSubmit fn props
  msg: string
  options: {
    invalidateQuery: Promise<void>
    navigate?: void
    resetState?: () => void
  }
}

export interface HandleDeleteBtnClickProps { // handleDeleteBtn fn props
  uuid: string
  deleteBtnActive: boolean
  deleteFn: (uuid: string) => Promise<ServerResponse>
  options: {
    invalidateQuery: Promise<void>
    setState?: Dispatch<SetStateAction<GetSiteLogState|GetViolationState>>
    resetState?: () => void
  }
}