import { Controller } from "react-hook-form"
import { Select } from "@mobiscroll/react"
import { useUpdateSiteContactsFormContext, useSetSiteContactOptions } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { ContactOptionsType } from "./hooks"

export const SiteContactsInputs = () => { // Site contacts inputs
  const contactOptions = useSetSiteContactOptions()

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
  const { control } = useUpdateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="primaryContact" className={styles.checkboxLabel}>Primary Contact:</label>
      <Controller
        name={'primaryContact'}
        control={control}
        render={({ field }) => (
          <Select
            { ...field }
            data={contactOptions}
            onChange={(event) => field.onChange(event.value)}
            filter={true} />
        )} />
    </div>
  )
}

const ContractorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Contractors select
  const { control } = useUpdateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="contractors" className={styles.checkboxLabel}>Contractors:</label>
      <Controller
        name={'contractors'}
        control={control}
        render={({ field }) => (
          <Select
            { ...field }
            data={contactOptions}
            selectMultiple={true}
            onChange={(event) => field.onChange(event.value)}
            filter={true} />
        )} />
    </div>
  )
}

const InspectorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Site inspectors select
  const { control } = useUpdateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="inspectors" className={styles.checkboxLabel}>Inspectors:</label>
      <Controller
        name={'inspectors'}
        control={control}
        render={({ field }) => (
          <Select
            { ...field }
            data={contactOptions}
            selectMultiple={true}
            onChange={(event) => field.onChange(event.value)}
            filter={true} />
        )} />
    </div>
  )
}

const OtherContactsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Other site contacts select
  const { control } = useUpdateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="otherContacts" className={styles.checkboxLabel}>Other:</label>
      <Controller
        name={'otherContacts'}
        control={control}
        render={({ field }) => (
          <Select
            { ...field }
            data={contactOptions}
            selectMultiple={true}
            onChange={(event) => field.onChange(event.value)}
            filter={true} />
        )} />
    </div>
  )
}