// Types
import { SetDischargesObjProps } from './types'

export const setDischargesObj = (discharges: SetDischargesObjProps['discharges']): { total: number, open: number, closed: number } => { // Set illicit discharges obj for indicator
  let dischargesObj: { total: number, open: number, closed: number } = {
    total: 0,
    open: 0,
    closed: 0
  }

  discharges.forEach(discharge => {
    dischargesObj.total++

    if(discharge.closed) {
      dischargesObj.closed++
    } else dischargesObj.open++
  })

  return dischargesObj
}