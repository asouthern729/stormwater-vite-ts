import { Select } from "@mobiscroll/react"
import { useSetSiteContactOptions, useHandlePrimaryContactSelect, useHandleContractorSelect, useHandleInspectorSelect, useHandleOtherContactSelect } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { ContactOptionsType } from "./hooks"
import { useCreateSiteFormContext } from "../../create/CreateSiteForm/hooks"

export const SiteContactsInputs = () => { // Site contacts inputs
  const contactOptions = useSetSiteContactOptions()

  if(!contactOptions.length) return null

  return (
    <div className="flex w-full flex-wrap">
      <PrimaryContactSelect contactOptions={contactOptions} />
      <ContractorsSelect contactOptions={contactOptions} />
      <InspectorsSelect contactOptions={contactOptions} />
      <OtherContactsSelect contactOptions={contactOptions} />
    </div>
  )
}

const PrimaryContactSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Primary contact select
  const { watch } = useCreateSiteFormContext()
  const { onChange } = useHandlePrimaryContactSelect()

  const contacts = watch('SiteContacts') || []

  const primaryContact = contacts.find(contact => contact.isPrimary)

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="primaryContact" className={styles.checkboxLabel}>Primary Contact:</label>
      <Select
        data={contactOptions}
        value={primaryContact?.contactId}
        onChange={(e) => onChange(e)}
        filter={true} />
    </div>
  )
}

const ContractorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Contractors select
  const { watch } = useCreateSiteFormContext()
  const { onChange } = useHandleContractorSelect()

  const contacts = watch('SiteContacts') || []

  const contractors = contacts.filter(contact => contact.isContractor).map(contact => contact.contactId)

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="contractors" className={styles.checkboxLabel}>Contractors:</label>
      <Select
        data={contactOptions}
        value={contractors}
        selectMultiple={true}
        onChange={(e) => onChange(e)}
        filter={true} />
    </div>
  )
}

const InspectorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Site inspectors select
  const { watch } = useCreateSiteFormContext()
  const { onChange } = useHandleInspectorSelect()

  const contacts = watch('SiteContacts') || []

  const inspectors = contacts.filter(contact => contact.isInspector).map(contact => contact.contactId)

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="inspectors" className={styles.checkboxLabel}>Inspectors:</label>
      <Select
        data={contactOptions}
        value={inspectors}
        selectMultiple={true}
        onChange={(e) => onChange(e)}
        filter={true} />
    </div>
  )
}

const OtherContactsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Other site contacts select
  const { watch } = useCreateSiteFormContext()
  const { onChange } = useHandleOtherContactSelect()

  const contacts = watch('SiteContacts') || []

  const otherContacts = contacts.filter(contact => !contact.isPrimary && !contact.isContractor && !contact.isInspector).map(contact => contact.contactId)

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="otherContacts" className={styles.checkboxLabel}>Other:</label>
      <Select
        data={contactOptions}
        value={otherContacts}
        selectMultiple={true}
        onChange={(e) => onChange(e)}
        filter={true} />
    </div>
  )
}