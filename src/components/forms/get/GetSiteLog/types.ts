export interface GetSiteLogProps { // GetSiteLog props
  uuid: string | undefined
  resetState: () => void
}

export interface GetSiteLogState { // GetSiteLog state obj
  deleteBtnActive: boolean
  formUUID?: string | undefined
}