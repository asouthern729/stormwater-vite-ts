import { useForm } from "react-hook-form"
import { setDateForForm , handleSuccessfulFormSubmit} from "../../../../helpers"
import { updateSite, deleteSiteContacts, createSiteContact } from "../../../../context/App/AppActions"
import { addContact } from "../../create/CreateSiteForm/utils"
import { errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { Site, SiteContact, SiteObj, SiteContactObj } from "../../../../context/App/types"
import { UpdateSiteFormUseForm, HandleUpdateSiteFormSubmitProps, HandleRequiredFieldValidationProps } from "./types"

export const useUpdateSiteForm = (site: Site): UseFormReturn<UpdateSiteFormUseForm> => { // UpdateSiteForm useForm state
  return useForm<UpdateSiteFormUseForm>({
    defaultValues: {
      name: site.name,
      location: site.location,
      xCoordinate: site.xCoordinate,
      yCoordinate: site.yCoordinate,
      inspectorId: site.inspectorId,
      preconDate: setDateForForm(site.preconDate),
      permit: site.permit,
      cof: site.cof,
      tnq: site.tnq,
      greenInfrastructure: site.greenInfrastructure,
      inactive: site.inactive,
      primaryContact: setContacts(site.SiteContacts).primary,
      contractors: setContacts(site.SiteContacts).contractors,
      siteInspectors: setContacts(site.SiteContacts).siteInspectors,
      otherContacts: setContacts(site.SiteContacts).otherContacts,
      uuid: site.uuid
    }
  })
}

export const handleUpdateSiteFormSubmit = async (formData: HandleUpdateSiteFormSubmitProps['formData'], options: HandleUpdateSiteFormSubmitProps['options']): Promise<void> => { // Handle form submit
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
    greenInfrastructure: formData.greenInfrastructure,
    inactive: formData.inactive,
    uuid: formData.uuid
  }

  const result = await updateSite(siteObj)

  if(result.success) {
    const siteId = result.data.siteId

    const contactsArray: SiteContactObj[] = []

    if(formData.primaryContact) { // Handle primaryContact
      addContact(contactsArray, formData.primaryContact, siteId, { isPrimary: true, isContractor: false, isInspector: false })
    }

    formData.contractors.forEach(contractor => { // Handle contractors
      addContact(contactsArray, contractor, siteId, { isPrimary: false, isContractor: true, isInspector: false })
    })

    formData.siteInspectors.forEach(inspector => { // Handle site inspectors
      addContact(contactsArray, inspector, siteId, { isPrimary: false, isContractor: false, isInspector: true })
    })

    formData.otherContacts.forEach(contact => { // Handle other contacts
      addContact(contactsArray, contact, siteId, { isPrimary: false, isContractor: false, isInspector: true })
    })

    await Promise.all([
      deleteSiteContacts(siteId), // Delete existing site contacts 
      ...contactsArray.map(contact => createSiteContact(contact))
    ])

    handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery, navigate })
  } else errorPopup(result.msg)
}

export const handleRequiredFieldValidation = (field: HandleRequiredFieldValidationProps['field'], options: HandleRequiredFieldValidationProps['options']): void => { // Handle form field validation onBlur
  const { watch, trigger } = options

  if(!watch(field)) {
    trigger(field)
  }
}

const setContacts = (contacts: SiteContact[]): { primary: string, contractors: string[], siteInspectors: string[], otherContacts: string[] } => {
  const types: { primary: string, contractors: string[], siteInspectors: string[], otherContacts: string[] } = {
    primary: '',
    contractors: [],
    siteInspectors: [],
    otherContacts: []
  }

  contacts.forEach(contact => {
    if(contact.isPrimary) { // Primary
      return types.primary = contact.contactId
    } else {
      if(contact.isContractor) { // Contracts
        return types.contractors.push(contact.contactId)
      }

      if(contact.isInspector) { // Inspectors
        return types.siteInspectors.push(contact.contactId)
      }

      return types.otherContacts.push(contact.contactId) // Other contacts
    }
  })

  return types
}