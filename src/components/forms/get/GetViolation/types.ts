export interface GetViolationProps { // GetViolation props
  uuid: string | undefined
  handleCloseForm: () => void
}

export interface GetViolationState { // GetViolation state obj
  deleteBtnActive: boolean
  formUUID?: string | undefined
}