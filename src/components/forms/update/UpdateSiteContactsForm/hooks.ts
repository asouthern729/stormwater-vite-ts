import { useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { CreateSiteFormUseForm } from '../../create/CreateSiteForm/types'
import { UpdateSiteFormUseForm } from '../UpdateSiteForm/types'

export const useCreateSiteContactsFormContext = (): UseFormReturn<CreateSiteFormUseForm|UpdateSiteFormUseForm> => { // CreateSiteContactsForm context
  const methods = useFormContext<CreateSiteFormUseForm|UpdateSiteFormUseForm>()

  return methods
}