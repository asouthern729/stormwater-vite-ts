export interface GetIllicitDischargeProps { // GetIllicitDischarge props
  uuid: string | undefined
  resetState: () => void
}

export interface GetIllicitDischargeState { // GetIllicitDischarge state obj
  deleteBtnActive: boolean
}