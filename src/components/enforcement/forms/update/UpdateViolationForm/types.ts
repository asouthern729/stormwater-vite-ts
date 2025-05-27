// Types
import { UseFormWatch, UseFormTrigger } from "react-hook-form"
import { ConstructionViolation } from "../../../../../context/App/types"

export interface UpdateViolationFormProps { // UpdateViolationForm props
  violation: ConstructionViolation
  handleCloseForm: () => void
}

export interface UpdateViolationFormUseForm { // UpdateViolationForm useForm state
  readonly violationId: string
  readonly siteId: string
  date: string | undefined
  details: string
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  swoDate: string | undefined
  swoLiftedDate: string | undefined
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
  existingFollowUpDates: { followUpDate: string, uuid: string }[]
  readonly uuid: string
}

export interface UseUpdateViolationFormProps { // useUpdateViolationForm hook props
  violation: ConstructionViolation
} 

export interface HandleUpdateViolationFormSubmitProps { // handleUpdateViolationFormSubmit fn props
  formData: UpdateViolationFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof UpdateViolationFormUseForm
  options: {
    watch: UseFormWatch<UpdateViolationFormUseForm>
    trigger: UseFormTrigger<UpdateViolationFormUseForm>
  }
}