// Types
import { ConstructionViolationInterface } from "@/context/App/types"
import { SiteForm } from "@/components/site/containers/SiteContainer/types"

export interface ViolationsTableData extends ConstructionViolationInterface {
  primaryPermitee: string | null | undefined
  site: string | undefined
  siteUUID: string
  form: SiteForm
}