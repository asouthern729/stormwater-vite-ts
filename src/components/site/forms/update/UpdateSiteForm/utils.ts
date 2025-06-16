import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "../../../../../utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateSite = async (formData: AppTypes.SiteCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.updateSite(formData, authHeaders(token))

  if(result.success) {
    await AppActions.deleteSiteContacts(result.data.siteId, authHeaders(token))

    const contacts = formData.SiteContacts || []

    await Promise.all(contacts.map(contact => AppActions.createSiteContact({ ...contact, siteId: result.data.siteId }, authHeaders(token))))
    
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}