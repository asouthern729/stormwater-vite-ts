import { useContext } from "react"
import { Controller } from "react-hook-form"
import { Select } from "@mobiscroll/react"
import AppContext from "../../../../../context/App/AppContext"
import { useCreateSiteContactsFormContext } from './hooks'
import styles from '../../Forms.module.css'

export const SiteContactsInputs = () => { // Site contacts inputs

  return (
    <div className="flex w-full flex-wrap">
      <PrimaryContactSelect />
      <ContractorsSelect />
      <InspectorsSelect />
      <OtherContactsSelect />
    </div>
  )
}

const PrimaryContactSelect = () => { // Primary contact select
  const { contactOptions } = useContext(AppContext)

  const methods = useCreateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="primaryContact" className={styles.checkboxLabel}>Primary Contact:</label>
      <Controller
        name={'primaryContact'}
        control={methods.control}
        render={({ field }) => (
          <Select
            { ...field }
            data={[ { text: '', value: '' }, ...contactOptions ]}
            onChange={(event) => field.onChange(event.value)}
            filter={true} />
        )} />
    </div>
  )
}

const ContractorsSelect = () => { // Contractors select
  const { contactOptions } = useContext(AppContext)

  const methods = useCreateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="contractors" className={styles.checkboxLabel}>Contractors:</label>
      <Controller
        name={'contractors'}
        control={methods.control}
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

const InspectorsSelect = () => { // Site inspectors select
  const { contactOptions } = useContext(AppContext)

  const methods = useCreateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="siteInspectors" className={styles.checkboxLabel}>Inspectors:</label>
      <Controller
        name={'siteInspectors'}
        control={methods.control}
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

const OtherContactsSelect = () => { // Other site contacts select
  const { contactOptions } = useContext(AppContext)

  const methods = useCreateSiteContactsFormContext()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="otherContacts" className={styles.checkboxLabel}>Other:</label>
      <Controller
        name={'otherContacts'}
        control={methods.control}
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