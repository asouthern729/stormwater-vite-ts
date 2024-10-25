import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createContact } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { ContactObj } from "../../../../context/App/types"
import { CreateContactFormUseForm, HandleCreateContactFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const useCreateContactForm = (): UseFormReturn<CreateContactFormUseForm> => { // CreateContactForm useform
  return useForm<CreateContactFormUseForm>({
    defaultValues: {
      name: null,
      company: null,
      phone: null,
      email: null,
      inactive: false
    }
  })
}

export const handleCreateContactFormSubmit = async (formData: HandleCreateContactFormSubmitProps['formData'], options: HandleCreateContactFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, navigate } = options

  const contactObj: ContactObj = {
    name: formData.name as string,
    company: formData.company,
    phone: formData.phone,
    email: formData.email,
    inactive: formData.inactive
  }

  const result = await createContact(contactObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, navigate })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}