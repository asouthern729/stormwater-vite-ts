export interface GetContactProps { // GetContact props
  uuid: string | undefined
  resetState: () => void
}

export interface GetContactState { // GetContact state obj
  deleteBtnActive: boolean
  formUUID?: string | undefined
}