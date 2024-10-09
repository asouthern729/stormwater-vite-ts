// Types
import { Page } from "../../../../context/App/types"

export interface HeaderBtnProps { // HeaderBtn props
  label: string
  handleClick: () => void
}

export interface SetBtnStyleProps { // setBtnStyle fn props
  activePage: Page
  label: Page | string 
}