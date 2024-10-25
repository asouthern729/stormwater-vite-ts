import { useForm } from "react-hook-form"
import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { updateContact } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { Contact, ContactObj } from "../../../../context/App/types"
import { UpdateContactFormUseForm, HandleUpdateContactFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const useUpdateContactForm = (contact: Contact): UseFormReturn<UpdateContactFormUseForm> => { // UpdateContactForm useForm state
  return useForm<UpdateContactFormUseForm>({
    defaultValues: {
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email,
      inactive: contact.inactive,
      uuid: contact.uuid
    }
  })
}

export const handleUpdateContactFormSubmit = async (formData: HandleUpdateContactFormSubmitProps['formData'], options: HandleUpdateContactFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { resetState, invalidateQuery } = options

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
    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, resetState })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}