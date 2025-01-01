import { handleSuccessfulFormSubmit } from "../../../../helpers"
import { createSite, createSiteContact } from "../../../../context/App/AppActions"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { SiteObj, SiteContactObj } from "../../../../context/App/types"
import { HandleCreateSiteFormSubmitProps, AddContactProps, HandleRequiredFieldValidationProps } from "./types"

export const handleCreateSiteFormSubmit = async (formData: HandleCreateSiteFormSubmitProps['formData'], options: HandleCreateSiteFormSubmitProps['options']): Promise<void> => { // Handle form submit
  if(!formData.xCoordinate) {
    return errorPopup('Site Location Required')
  }

  const { navigate, invalidateQuery } = options

  const siteObj: SiteObj = {
    name: formData.name,
    location: formData.location,
    xCoordinate: formData.xCoordinate,
    yCoordinate: formData.yCoordinate,
    inspectorId: formData.inspectorId,
    preconDate: formData.preconDate,
    permit: formData.permit,
    cof: formData.cof,
    tnq: formData.tnq,
    greenInfrastructure: formData.greenInfrastructure
  }

  const result = await createSite(siteObj)

  if(result.success) {
    const newSiteId = result.data.siteId

    const contactsArray: SiteContactObj[] = []

    if(formData.primaryContact) { // Handle primaryContact
      addContact(contactsArray, formData.primaryContact, newSiteId, { isPrimary: true, isContractor: false, isInspector: false })
    }

    formData.contractors.forEach(contractor => { // Handle contractors
      addContact(contactsArray, contractor, newSiteId, { isPrimary: false, isContractor: true, isInspector: false })
    })

    formData.siteInspectors.forEach(inspector => { // Handle site inspectors
      addContact(contactsArray, inspector, newSiteId, { isPrimary: false, isContractor: false, isInspector: false })
    })

    formData.otherContacts.forEach(contact => { // Handle other contacts
      addContact(contactsArray, contact, newSiteId, { isPrimary: false, isContractor: false, isInspector: false })
    })

    await Promise.all(
      contactsArray.map(contact => createSiteContact(contact))
    )

    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, navigate })
  } else errorPopup(result.msg)
}

export const addContact = (contactsArray: AddContactProps['contactsArray'], contactId: AddContactProps['contactId'], siteId: AddContactProps['siteId'], options: AddContactProps['options']): void => { // Add contact to contactsArray helper fn
  const contactObj: SiteContactObj = {
    siteId,
    contactId,
    ...options
  }

  contactsArray.push(contactObj)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}