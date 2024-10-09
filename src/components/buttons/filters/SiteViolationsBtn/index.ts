// Types
import { SetViolationsObjProps } from "./types"

export const setViolationsObj = (violations: SetViolationsObjProps['violations']): { total: number, open: number, closed: number } => { // Set violations obj for indicator
  let violationsObj: { total: number, open: number, closed: number } = {
    total: 0,
    open: 0,
    closed: 0
  }

  violations.forEach(violation => {
    violationsObj.total++

    if(violation.closed) {
      violationsObj.closed++
    } else violationsObj.open++
  })

  return violationsObj
}