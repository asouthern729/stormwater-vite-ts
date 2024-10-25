export interface CreateLinkProps { // CreateLink props
  label: string
  location: Location
}

type Location =
  | "/create?formType=createViolation"
  | "/create?formType=createComplaint"
  | "/create?formType=createDischarge"
  | "/create?formType=createContact"
  | "/create?formType=createGreen"