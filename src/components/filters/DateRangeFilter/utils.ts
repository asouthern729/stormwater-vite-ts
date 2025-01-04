// Types
import { HandleDateChangeProps } from "./types"

export const handleDateChange = (event: HandleDateChangeProps['event'], options: HandleDateChangeProps['options']): void => { // Handle date input change
  const { setState } = options

  const value = event.currentTarget.value
  const target = event.currentTarget.id

  if(value) {
    setState(prevState => ({ ...prevState, [target]: value }))
  }
}