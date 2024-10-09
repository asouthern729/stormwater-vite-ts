import { useForm } from "react-hook-form"

// Types
import { CreateContactFormUseForm } from "./types"

export const useCreateContactForm = () => { // CreateContactForm useform
  return useForm<CreateContactFormUseForm>({
    defaultValues: {
      name: null,
      company: null,
      phone: null,
      email: null
    }
  })
}