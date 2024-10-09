export interface GetViolationProps { // GetViolation props
  uuid: string | undefined
  resetState: () => void
}

export interface GetViolationState { // GetViolation state obj
  deleteBtnActive: boolean
}