// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { GreenInfrastructure } from "../../../../context/App/types"

export interface UpdateGreenViolationFormProps { // UpdateGreenViolationForm props
  green: GreenInfrastructure
  handleCloseForm: () => void
}

export interface UpdateGreenViolationFormUseForm { // UpdateGreenViolationForm useForm
  readonly greenId: string
  date: string | undefined
  xCoordinate: number | undefined
  yCoordinate: number | undefined
  locationDescription: string | null
  inspectorId: string | null
  details: string
  comments: string | null
  responsibleParty: string | null
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  bondReleased: boolean | string | null
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
  existingFollowUpDates: { followUpDate: string, uuid: string }[]
  readonly uuid: string
}

export interface UseUpdateGreenViolationFormProps { // useUpdateGreenViolationForm hook props
  green: GreenInfrastructure
}

export interface HandleUpdateGreenViolationFormSubmitProps { // handleUpdateGreenViolationFormSubmit fn props
  formData: UpdateGreenViolationFormUseForm
  options: {
    handleCloseForm: () => void
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateGreenViolationFormUseForm
  options: {
    watch: UseFormWatch<UpdateGreenViolationFormUseForm>
    trigger: UseFormTrigger<UpdateGreenViolationFormUseForm>
  }
}