// Types
import { SetComplaintsObjProps } from "./types"

export const setComplaintsObj = (complaints: SetComplaintsObjProps['complaints']): { total: number, open: number, closed: number } => {
  const complaintsObj: { total: number, open: number, closed: number } = {
    total: 0,
    open: 0,
    closed: 0
  }

  complaints.forEach(complaint => {
    complaintsObj.total++

    if(complaint.closed) {
      complaintsObj.closed++
    } else complaintsObj.open++
  })

  return complaintsObj
}