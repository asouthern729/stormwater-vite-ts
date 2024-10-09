export interface GetComplaintProps { // GetComplaint props
  uuid: string | undefined
  resetState: () => void
}

export interface GetComplaintState { // GetComplaint state obj
  deleteBtnActive: boolean
}