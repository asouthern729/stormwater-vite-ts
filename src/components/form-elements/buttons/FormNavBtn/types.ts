// Types
import { MouseEvent } from "react"
import { SiteForm } from "../../../site/containers/SiteContainer/types"

export interface FormNavBtnProps {
  label: string
  value: SiteForm
  isActive: boolean
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
}