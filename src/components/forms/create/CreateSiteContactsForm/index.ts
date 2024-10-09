import { useForm } from "react-hook-form"

// Types
import { CreateSiteContactsFormUseForm } from "./types"

export const useCreateSiteContacts = () => { // CreateSiteContacts useForm
  return useForm<CreateSiteContactsFormUseForm>({
    defaultValues: {
      primaryContact: null,
      contractors: [],
      siteInspectors: [],
      otherContacts: []
    }
  })
}