export interface GetContactProps { // GetContact props
  uuid: string | undefined
  handleCloseForm: () => void
}

export interface GetContactState { // GetContact state obj
  deleteBtnActive: boolean
  formUUID?: string | undefined
}