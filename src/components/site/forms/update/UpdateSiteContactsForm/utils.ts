import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'
import { savedPopup, errorPopup } from '@/utils/Toast/Toast'

// Types
import { UpdateSiteContactsForm } from './hooks'

export const handleUpdateSiteContacts = async (formData: UpdateSiteContactsForm, token: string) => {
  const result = await AppActions.deleteSiteContacts(formData.siteId, authHeaders(token))

  if(result.success) {
    savedPopup(result.msg)
  } else errorPopup(result.msg)
}