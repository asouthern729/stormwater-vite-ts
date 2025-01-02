export interface GetComplaintProps { // GetComplaint props
  uuid: string | undefined
  handleCloseForm: () => void
}

export interface GetComplaintState { // GetComplaint state obj
  deleteBtnActive: boolean
}