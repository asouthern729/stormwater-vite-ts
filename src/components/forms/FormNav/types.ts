// Types
import { MouseEvent } from "react"
import { SiteForm } from "../../containers/SiteContainer/types"

export interface FormNavProps { // FormNav props
  activeForm: SiteForm
  handleBtnClick: (e: MouseEvent<HTMLButtonElement>) => void
}