import { useForm } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { Contact } from "../../../../context/App/types"
import { UpdateContactFormUseForm } from "./types"

export const useUpdateContactForm = (contact: Contact): UseFormReturn<UpdateContactFormUseForm> => { // UpdateContactForm useForm state
  return useForm<UpdateContactFormUseForm>({
    defaultValues: {
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email,
      uuid: contact.uuid
    }
  })
}