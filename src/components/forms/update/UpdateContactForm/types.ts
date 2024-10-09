// Types
import { Contact } from "../../../../context/App/types"

export interface UpdateContactFormProps { // UpdateContactForm props
  contact: Contact
}

export interface UpdateContactFormUseForm { // UpdateContactForm useForm state object
  name: string
  company: string
  phone: string
  email: string
  readonly uuid: string
}