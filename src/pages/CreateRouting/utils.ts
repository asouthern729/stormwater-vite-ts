// Types
import { CreateFormType } from "./types"

// Components
import CreateInspectorForm from "@/components/inspectors/forms/create/CreateInspectorForm"
import CreateContactForm from "@/components/contacts/forms/create/CreateContactForm"
import CreateSiteForm from "@/components/site/forms/create/CreateSiteForm"

export const createFormMap = new Map<CreateFormType, () => JSX.Element>([
  ['createInspector', CreateInspectorForm],
  ['createContact', CreateContactForm],
  ['createSite', CreateSiteForm]
])
