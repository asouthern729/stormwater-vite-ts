import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from '@mobiscroll/react'
import AppContext from '../../../../context/App/AppContext'
import styles from '../../Forms.module.css'

function UpdateSiteContactsForm() {
  const { contactOptions } = useContext(AppContext)
  const { control } = useFormContext()

  return (
    <div className={styles.body}>

      <div className={styles.subtitle}>Site Contacts</div>

      <div className="flex w-full flex-wrap">
        <div className="flex-1 flex flex-col text-center">
          <label htmlFor="primaryContact" className={styles.checkboxLabel}>Primary Contact:</label>
          <Controller
            name={'primaryContact'}
            control={control}
            render={({ field }) => (
              <Select
                { ...field }
                data={[ { text: '', value: '' }, ...contactOptions ]}
                onChange={(event) => field.onChange(event.value)}
                filter={true} />
            )} />
        </div>

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

        <div className="flex-1 flex flex-col text-center">
          <label htmlFor="siteInspectors" className={styles.checkboxLabel}>Inspectors:</label>
          <Controller
            name={'siteInspectors'}
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

      </div>

    </div>
  )
}

export default UpdateSiteContactsForm