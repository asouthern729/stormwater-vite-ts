import { useForm, useFormContext } from "react-hook-form"
import { useGetContacts } from "@/pages/Contacts/hooks"

// Types
import * as AppTypes from '@/context/App/types'

export type UpdateSiteContactsForm = { primaryContact: string, contractors: string[], inspectors: string[], otherContacts: string[], siteId: string }

export const useUpdateSiteContactsForm = (site: AppTypes.SiteInterface) => {

  return useForm<UpdateSiteContactsForm>({
    mode: 'onBlur',
    defaultValues: {
      primaryContact: site.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.contactId,
      contractors: site.SiteContacts?.map(contact => {
        if(contact.isContractor) return contact.contactId
      }),
      inspectors: site.SiteContacts?.map(contact => {
        if(contact.isInspector) return contact.contactId
      }),
      otherContacts: site.SiteContacts?.map(contact => {
        if(!contact.isPrimary && !contact.isContractor && !contact.isInspector) return contact.contactId
      }),
      siteId: site.siteId
    }
  })
}

export const useUpdateSiteContactsFormContext = () => {
  const methods = useFormContext<UpdateSiteContactsForm>()

  return methods
}

export type ContactOptionsType = { value: string, text: string }

export const useSetSiteContactOptions = () => {
  const result = useGetContacts()

  if(result.isSuccess) {
    const contacts = result.data.data

    const options: ContactOptionsType[] = contacts.map(contact => ({ value: contact.contactId, text: contact.name }))

    return [ { value: '', text: '' }, ...options ]
  } else return []
}

