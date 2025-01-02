import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateContact } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { ContactObj } from "../../../../context/App/types"
import { HandleUpdateContactFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const handleUpdateContactFormSubmit = async (formData: HandleUpdateContactFormSubmitProps['formData'], options: HandleUpdateContactFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { handleCloseForm, invalidateQuery } = options

  const contactObj: ContactObj = {
    name: formData.name,
    company: formData.company,
    phone: formData.phone,
    email: formData.email,
    inactive: formData.inactive,
    uuid: formData.uuid
  }

  const result = await updateContact(contactObj)

  if(result.success) {
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, handleCloseForm })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}