export interface CreateMultipleSiteLogsFormProps { // CreateMultipleSiteLogsForm props
  siteIds: string[]
  handleCloseForm: () => void
}

export interface CreateMultipleSiteLogsFormUseForm { // CreateMultipleSiteLogsForm useForm state
  readonly siteIds: string[]
  inspectionDate: string
}

export interface UseCreateMultipleSiteLogsFormProps { // useCreateMultipleSiteLogsForm hook props
  siteIds: string[]
}

export interface HandleCreateMultipleSiteLogsFormSubmitProps { // handleCreateMultipleSiteLogsFormSubmit fn props
  formData: CreateMultipleSiteLogsFormUseForm
  options: {
    invalidateQuery: () => Promise<void>
    handleCloseForm: () => void
  }
}