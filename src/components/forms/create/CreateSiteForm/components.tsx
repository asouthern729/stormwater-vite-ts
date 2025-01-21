import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import { useCreateSiteFormContext } from './hooks'
import { handleRequiredFieldValidation } from './utils'
import styles from '../../Forms.module.css'

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

export const Map = () => { // Map input

  return (
    <div className={styles.mapDiv}>
      <MapContainer
        sites={[]}
        type={'create'}
        zoom={16} />
    </div>
  )
}

export const NameInput = () => { // Site name input
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Site Name:'}
          name={'name'}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('name', {
            required: 'Site name is required',
            maxLength: {
              value: 100,
              message: 'Site name must be 100 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger }),
            onChange: () => methods.trigger('name')
          }) } />
      </div>
      <FormError field={'name'} />
    </div>
  )
}

export const LocationInput = () => { // Site location description
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Location:'}
          name={'location'}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('location', {
            required: 'Site location is required',
            maxLength: {
              value: 100,
              message: 'Site location must be 100 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('location', { watch: methods.watch, trigger: methods.trigger }),
            onChange: () => methods.trigger('location')
          }) } />
      </div>
      <FormError field={'location'} />
    </div>
  )
}

export const PreconDateInput = () => { // Site precon date input
  const methods = useCreateSiteFormContext()
  
  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Precon Date:'}
          name={'preconDate'}
          required={true} />
        <input 
          type="date"
          className={styles.input}
          { ...methods.register('preconDate', {
            required: 'Precon date is required',
            onBlur: () => handleRequiredFieldValidation('preconDate', { watch: methods.watch, trigger: methods.trigger }),
          }) } />
      </div>
      <FormError field={'preconDate'} />
    </div>
  )
}

export const GreenInfrastructureSelect = () => { // Green infrastructure select
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Green Infrastructure:'}
          name={'greenInfrastructure'} />
        <select 
          className={styles.input}
          { ...methods.register('greenInfrastructure') }>
            <option value=""></option>
            <option value={"false"}>No</option>
            <option value={"true"}>Yes</option>
          </select>
      </div>
    </div>
  )
}

export const PermitInput = () => { // Permit input
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Permit #:'}
          name={'permit'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('permit', {
            maxLength: {
              value: 20,
              message: 'Permit must be 20 characters or less'
            }
          }) } />
      </div>
      <FormError field={'permit'} />
    </div>
  )
}

export const COFInput = () => { // COF number input
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'COF #:'}
          name={'cof'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('cof', {
            maxLength: {
              value: 10,
              message: 'COF # must be 10 characters or less'
            },
            onChange: () => methods.trigger('cof')
          }) } />
      </div>
      <FormError field={'cof'} />
    </div>
  )
}

export const TNQInput = () => { // TNQ input
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'TNQ #:'}
          name={'tnq'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('tnq', {
            maxLength: {
              value: 20,
              message: 'TNQ # must be 20 characters or less'
            },
            onChange: () => methods.trigger('tnq')
          }) } />
      </div>
      <FormError field={'tnq'} />
    </div>
  )
}

export const InspectorSelect = () => { // Inspector select
  const { inspectorOptions } = useContext(AppContext)

  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Inspector:'}
          name={'inspectorId'} />
        <select 
          className={styles.input}
          { ...methods.register('inspectorId') }>
          <option value=""></option>
          {inspectorOptions.map(inspector => {
            return (
              <option key={`inspector-option-${ inspector.value }`} value={inspector.value}>{inspector.text}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateSiteFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
  )
}