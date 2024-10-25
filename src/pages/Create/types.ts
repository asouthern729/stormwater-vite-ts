export interface SetCreateFormProps { // setCreateForm fn props
  form: CreateForm
}

export type CreateForm =
  | "createSite"
  | "createViolation"
  | "createComplaint"
  | "createDischarge"
  | "createInspector"
  | "createContact"
  | "createGreen"