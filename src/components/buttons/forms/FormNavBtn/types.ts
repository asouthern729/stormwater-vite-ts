// Types
import { MouseEvent } from "react"
import { SiteForm } from "../../../containers/SiteContainer/types"

export interface FormNavBtnProps {
  label: string
  value: SiteForm
  isActive: boolean
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
}