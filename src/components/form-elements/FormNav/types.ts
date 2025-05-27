// Types
import { MouseEvent } from "react"
import { SiteForm } from "../../site/containers/SiteContainer/types"

export interface FormNavProps { // FormNav props
  activeForm: SiteForm
  handleBtnClick: (e: MouseEvent<HTMLButtonElement>) => void
}