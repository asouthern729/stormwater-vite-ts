import { useCreateSiteFormContext } from "../../create/CreateSiteForm/hooks"
import { useGetContacts } from "@/pages/Contacts/hooks"

// Types
import { MbscSelectChangeEvent } from "@mobiscroll/react"
import * as AppTypes from '@/context/App/types'

export type ContactOptionsType = { value: string, text: string }

export const useSetSiteContactOptions = () => {
  const result = useGetContacts()

  if(result.isSuccess) {
    const contacts = result.data.data.filter(contact => !contact.inactive)

    const options: ContactOptionsType[] = contacts.map(contact => ({ value: contact.contactId, text: contact.name }))

    return [ { value: '', text: '' }, ...options ]
  } else return []
}

export const useHandlePrimaryContactSelect = () => {
  const { getValues, setValue } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const value = e.value

    const siteId = getValues('siteId')

    const contacts = getValues('SiteContacts') || []

    const nonPrimaryContacts = contacts.filter(contact => !contact.isPrimary)

    const primaryContact: AppTypes.SiteContactCreateInterface = { 
      isPrimary: true, 
      isContractor: false, 
      isInspector: false, 
      siteId: siteId || '', 
      contactId: value 
    }

    setValue('SiteContacts', [ ...nonPrimaryContacts, primaryContact ], { shouldDirty: true, shouldValidate: true })
  }

  return { onChange }
}

export const useHandleContractorSelect = () => {
  const { getValues, setValue } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]

    const contacts = getValues('SiteContacts') || []

    const siteId = getValues('siteId')
    
    const nonContractors = contacts?.filter(contact => !contact.isContractor) || []

    const newContractors: AppTypes.SiteContactCreateInterface[] = values.map(value => ({
      isPrimary: false,
      isContractor: true,
      isInspector: false,
      contactId: value,
      siteId: siteId || ''
    }))

    setValue('SiteContacts', [ ...nonContractors, ...newContractors ])
  }

  return { onChange }
}

export const useHandleInspectorSelect = () => {
  const { getValues, setValue } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]

    const siteId = getValues('siteId')

    const contacts = getValues('SiteContacts') || []

    const nonInspectors = contacts.filter(contact => !contact.isInspector)

    const inspectors: AppTypes.SiteContactCreateInterface[] = values.map(value => ({  
      isPrimary: false, 
      isContractor: false, 
      isInspector: true, 
      siteId: siteId || '', 
      contactId: value 
    }))

    setValue('SiteContacts', [ ...nonInspectors, ...inspectors ], { shouldDirty: true, shouldValidate: true })
  }

  return { onChange }
}

export const useHandleOtherContactSelect = () => {
  const { getValues, setValue } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]

    const siteId = getValues('siteId')

    const contacts = getValues('SiteContacts') || []

    const nonOtherContacts = contacts.filter(contact => contact.isPrimary || contact.isContractor || contact.isInspector )

    const otherContacts: AppTypes.SiteContactCreateInterface[] = values.map(value => ({ 
      isPrimary: false, 
      isContractor: false, 
      isInspector: false, 
      siteId: siteId || '', 
      contactId: value 
    }))

    setValue('SiteContacts', [ ...nonOtherContacts, ...otherContacts ], { shouldDirty: true, shouldValidate: true })
  }

  return { onChange }
}