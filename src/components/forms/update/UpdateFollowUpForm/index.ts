// Types
import { FollowUp } from "../../../../context/App/types"

export const setParentId = (followUp: FollowUp): string => { // Set follow up parentId
  let parent

  for(const prop in followUp) {
    if(['violationId', 'complaintId', 'illicitId', 'greenId'].includes(prop) && followUp[prop]) {
      parent = followUp[prop]
    }
  }

  return parent
}