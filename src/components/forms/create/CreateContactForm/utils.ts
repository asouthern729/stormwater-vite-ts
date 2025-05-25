import { handleSuccessfulFormSubmit } from "../../../../helpers/hooks"
import { createContact } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { ContactObj } from "../../../../context/App/types"
import { HandleCreateContactFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

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