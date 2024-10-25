// Types
import { SetGreenObjProps } from "./types"

export const setGreenObj = (green: SetGreenObjProps['green']): { total: number, open: number, closed: number } => { // Set green violations obj for indicator
  const greenObj: { total: number, open: number, closed: number } = {
    total: 0,
    open: 0,
    closed: 0
  }

  green.forEach(violation => {
    greenObj.total++

    if(violation.closed) {
      greenObj.closed++
    } else greenObj.open++
  })

  return greenObj
}