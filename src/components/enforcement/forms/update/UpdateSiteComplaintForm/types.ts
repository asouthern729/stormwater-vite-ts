// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { Complaint } from "../../../../../context/App/types"
import { Concern } from "../../create/CreateSiteComplaintForm/types"

export interface UpdateSiteComplaintFormProps { // UpdateSiteComplaintForm props
  complaint: Complaint
  handleCloseForm: () => void
}

export interface UpdateSiteComplaintFormUseForm { // UpdateSiteComplaintForm useForm state
  readonly complaintId: string
  readonly siteId: string | null
  date: string | undefined
  details: string
  inspectorId: string | null
  name: string | null
  address: string | null
  phone: string | null
  email: string | null
  readonly xCoordinate: number
  readonly yCoordinate: number
  locationDescription: string | null
  concern: Concern | null
  otherConcern: string | null
  responsibleParty: string | null
  comments: string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
  existingFollowUpDates: { followUpDate: string, uuid: string }[]
  readonly uuid: string
}

export interface UseUpdateSiteComplaintFormProps { // useUpdateSiteComplaintForm hook props
  complaint: Complaint
}

export interface HandleUpdateSiteComplaintFormSubmitProps { // handleUpdateSiteComplaintFormSubmit fn props
  formData: UpdateSiteComplaintFormUseForm
  options: {
    handleCloseForm: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateSiteComplaintFormUseForm
  options: {
    watch: UseFormWatch<UpdateSiteComplaintFormUseForm>
    trigger: UseFormTrigger<UpdateSiteComplaintFormUseForm>
  }
}