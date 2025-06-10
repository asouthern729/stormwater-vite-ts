export interface IssueTableDataType { // For SiteIssues and SitesIssues components
  date: string
  site?: string | undefined
  siteUUID?: string | undefined
  responsibleParty?: string | null | undefined
  civilPenalty: {
    issued: boolean | null
    received: boolean | null
  }
  swo: {
    issued: boolean | null
    lifted: boolean | null
  }
  closed: boolean | null
  form: 'updateComplaint' | 'updateViolation' | 'updateIllicitDischarge'
  details: string
  concern: string | null | undefined
  otherConcern: string | null | undefined
  uuid: string
}

export interface CombinedType {
  date: string
  siteId?: string | null 
  responsibleParty?: string | null 
  penaltyDate?: string | null
  paymentReceived?: string | null
  swoDate?: string | null
  swoLiftedDate?: string | null
  closed: boolean | null
  concern?: string 
  otherConcern?: string | null 
  details: string 
  uuid: string 
}