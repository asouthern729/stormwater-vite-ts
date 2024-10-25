// Types
import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue, UseFormWatch, UseFormTrigger } from "react-hook-form"
import { Site } from "../../../../context/App/types"

export interface CreateSiteComplaintFormProps { // CreateSiteComplaintForm props
  site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined
  date: string
  resetState?: () => void
}

export interface CreateSiteComplaintFormUseForm { // CreateSiteComplaintForm useForm state
  readonly siteId: string
  date: string | undefined
  details: string
  inspectorId: string | null
  name: string | null
  address: string | null
  phone: string | null
  email: string | null
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  concern: Concern | null
  otherConcern: string | null
  responsibleParty: string | null
  comments: string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
}

export interface UseCreateSiteComplaintFormProps { // useCreateSiteComplaintForm hook props
  site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined
  date: string
}

export interface UseHandleMapChangeProps { // useHandleMapChange hook props
  coordinates: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  options: {
    setValue: UseFormSetValue<CreateSiteComplaintFormUseForm>
  }
}

export interface HandleCreateSiteComplaintFormSubmitProps { // handleCreateSiteComplaintFormSubmit fn props
  formData: CreateSiteComplaintFormUseForm
  siteUUID: string
  options: {
    invalidateQuery: () => Promise<void>
    navigate: NavigateFunction
    resetState?: () => void
  }
}

export enum Concern {
  AssistanceRequest = "Assitance Request",
  Buffer = "Buffer",
  Draining = "Draining",
  Dumping = "Dumping",
  ErosionSedimentConstruction = "Erosion / Sediment / Construction",
  FishKillSpill = "Fish Kill / Spill",
  FloodingDraining = "Flooding / Draining",
  GarbageDebris = "Garbage / Debris",
  IllicitDischargeSpill = "Illicit Discharge / Spill",
  Leak = "Leak",
  Mosquitoes = "Mosquitoes",
  PostConstructionStormwaterPTP = "Post-construction Stormwater / PTP",
  WaterLineBreak = "Water Line Break",
  Other = "Other"
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateSiteComplaintFormUseForm
  options: {
    watch: UseFormWatch<CreateSiteComplaintFormUseForm>
    trigger: UseFormTrigger<CreateSiteComplaintFormUseForm>
  }
}