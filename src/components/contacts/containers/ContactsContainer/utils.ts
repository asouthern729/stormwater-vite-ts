// Types
import { MouseEvent } from "react"
import { HandleContactsTableRowClickProps } from "./types"

export const handleContactsTableRowClick = (setState: HandleContactsTableRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle row click - open form
  const { uuid } = event.currentTarget.dataset

  setState(prevState => ({ ...prevState, formUUID: uuid }))
}