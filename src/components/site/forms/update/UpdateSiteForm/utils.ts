import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { errorPopup, savedPopup } from "../../../../../utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateSite = async (formData: AppTypes.SiteCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.updateSite(formData, authHeaders(token))

  if(result.success) {
    if(formData.SiteContacts) {
      const contacts = formData.SiteContacts

      await Promise.all(
        contacts.map(contact => {
          if(contact.uuid) { // Existing contacts
            if(!contact.contactId) { // Delete
              AppActions.deleteSiteContact(contact.uuid, authHeaders(token))
            }
          } else AppActions.createSiteContact({ ...contact, siteId: formData.siteId as string }, authHeaders(token))
        })
      )

      savedPopup(result.msg)
    }
  } else errorPopup(result.msg)
}