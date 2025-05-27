import { handleSuccessfulFormSubmit } from "../../../../../helpers/hooks"
import { createSiteLog } from "../../../../../context/App/AppActions"

// Types
import { SiteLogObj } from "../../../../../context/App/types"
import { HandleCreateMultipleSiteLogsFormSubmitProps } from "./types"

export const handleCreateMultipleSiteLogsFormSubmit = async (formData: HandleCreateMultipleSiteLogsFormSubmitProps['formData'], options: HandleCreateMultipleSiteLogsFormSubmitProps['options']): Promise<void> => { // Handle form submit
  const { invalidateQuery, handleCloseForm } = options

  const { siteIds, inspectionDate } = formData

  await Promise.all(
    siteIds.map(async siteId => {
      const siteLogObj: SiteLogObj = {
        inspectionDate,
        siteId
      }

      createSiteLog(siteLogObj)
    })
  )

  handleSuccessfulFormSubmit('Saved', { invalidateQuery, handleCloseForm })
}