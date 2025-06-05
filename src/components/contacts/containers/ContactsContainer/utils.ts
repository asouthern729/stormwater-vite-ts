// Types
import { MouseEvent } from "react"
import { HandleContactsTableRowClickProps } from "./types"

export const handleContactsTableRowClick = (setState: HandleContactsTableRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle row click - open form
  const { uuid } = event.currentTarget.dataset

  setState(prevState => ({ ...prevState, formUUID: uuid }))
}

export const formatPhone = (phone: string) => {
  if(!phone) return

  return `${ phone.slice(0, 3) } ${ phone.slice(3, 6) } ${ phone.slice(6, 10) }`
}