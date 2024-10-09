// Types
import { MouseEvent } from "react"
import { HandleRowClickProps } from "./types"

export const handleRowClick = (setState: HandleRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle row click - open form
  const { uuid } = event?.currentTarget.dataset

  console.log(uuid)

  setState(prevState => ({ ...prevState, formUUID: uuid }))
}