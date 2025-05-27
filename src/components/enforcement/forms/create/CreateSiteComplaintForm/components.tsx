import { useContext } from "react"
import AppContext from "../../../../../context/App/AppContext"
import { useCreateSiteComplaintFormContext } from "./hooks"
import { handleRequiredFieldValidation } from './utils'
import styles from '../../Forms.module.css'

// Types
import { Concern } from "./types"

// Components
import MapContainer from "../../../../map/MapContainer"
import FormLabel from "../../../../form-elements/FormLabel/FormLabel"
import FormError from "../../../../form-elements/FormError"
import CancelBtn from "../../../../form-elements/buttons/CancelBtn/CancelBtn"
import SaveBtn from "../../../../form-elements/buttons/SaveBtn/SaveBtn"

export const Map = ({ visible }: { visible: boolean }) => { // Map - show if no associated site
  if(!visible) return null

  return (
    <div className={styles.mapDiv}>
      <MapContainer
        sites={[]}
        type={'create'}
        zoom={16} />
    </div>
  )
}

export const DateInput = () => { // Complaint date input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Complaint Date:'}
          name={'date'}
          required={true} />
        <input 
          type="date"
          className={styles.input}
          { ...methods.register('date', {
            required: 'Complaint date is required',
            onBlur: () => handleRequiredFieldValidation('date', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'date'} />
    </div>
  )
}

export const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  const { inspectorOptions } = useContext(AppContext)

  const methods = useCreateSiteComplaintFormContext()

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Inspector:'}
          name={'inspectorId'} />
        <select 
          className={styles.input}
          { ...methods.register('inspectorId') }>
            <option value={''}></option>
            {inspectorOptions.map((inspector) => (
              <option key={inspector.value} value={inspector.value}>
                {inspector.text}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export const LocationDescriptionInput = () => { // Location description input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Location Description:'}
          name={'locationDescription'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('locationDescription', {
            maxLength: {
              value: 50,
              message: 'Location description must be 50 characters or less'
            },
            onChange: () => methods.trigger('locationDescription')
          }) } />
      </div>
      <FormError field={'locationDescription'} />
    </div>
  )
}

export const ResponsiblePartyInput = () => { // Responsible party input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Responsible Party:'}
          name={'responsibleParty'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('responsibleParty', {
            maxLength: {
              value: 50,
              message: 'Responsible party must be 50 characters or less'
            },
            onChange: () => methods.trigger('responsibleParty')
          }) } />
      </div>
      <FormError field={'responsibleParty'} />
    </div>
  )
}

export const ConcernSelect = () => { // Concern type select
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Concern:'}
          name={'concern'}
          required={true} />
        <select 
          className={styles.input}
          { ...methods.register('concern', {
            required: 'Concern is required',
            onBlur: () => handleRequiredFieldValidation('concern', { watch: methods.watch, trigger: methods.trigger })
          }) }>
            <option value={''}></option>
            {Object.values(Concern).map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
        </select>
      </div>
      <FormError field={'concern'} />
    </div>
  )
}

export const OtherConcernInput = () => { // Other concern type input
  const methods = useCreateSiteComplaintFormContext()

  const visible = methods.watch('concern') === 'Other' && true

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Other Concern:'}
          name={'otherConcern'}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('otherConcern', {
            required: 'Other concern is required',
            maxLength: {
              value: 50,
              message: 'Other concern must be 50 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('otherConcern', { watch: methods.watch, trigger: methods.trigger }),
            onChange: () => methods.trigger('otherConcern')
          }) } />
      </div>
      <FormError field={'otherConcern'} />
    </div>
  )
}

export const DetailsInput = () => { // Complaint details input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Details:'}
          name={'details'}
          required={true} />
        <textarea 
          rows={3} 
          className={styles.input}
          { ...methods.register('details', {
            required: 'Complaint details is required',
            maxLength: {
              value: 2000,
              message: 'Complaint details must be 2000 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('details', { watch: methods.watch, trigger: methods.trigger }),
            onChange: () => methods.trigger('details')
          }) } />
      </div>
      <FormError field={'details'} />
    </div>
  )
}

export const CommentsInput = () => { // Comments input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Comments:'}
          name={'comments'} />
        <textarea 
          rows={3} 
          className={styles.input}
          { ...methods.register('comments', {
            maxLength: {
              value: 2000,
              message: 'Comments must be 2000 characters or less'
            },
            onChange: () => methods.trigger('comments')
          }) } />
      </div>
      <FormError field={'comments'} />
    </div>
  )
}

export const ComplaintantInputs = () => { // Complaintant information inputs
  
  return (
    <div className="flex gap-3 w-full flex-wrap">
      <ComplaintantNameInput />
      <ComplaintantAddressInput />
      <ComplaintantPhoneInput />
      <ComplaintantEmailInput />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateSiteComplaintFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={() => handleCloseForm()} />
    </div>
  )
}

const ComplaintantNameInput = () => { // Complaintant name input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex">
        <FormLabel
          label={'Full Name:'}
          name={'name'} />
        <input
          type="text"
          className={styles.input}
          { ...methods.register('name', {
            maxLength: {
              value: 50,
              message: 'Name must be 50 characters or less'
            }
          }) } />
      </div>
      <FormError field={'name'} />
    </div>
  )
}

const ComplaintantAddressInput = () => { // Complaintant address input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Address:'}
          name={'address'} />
        <input
          type="text"
          className={styles.input}
          { ...methods.register('address', {
            maxLength: {
              value: 100,
              message: 'Address must be 100 characters or less'
            },
            onChange: () => methods.trigger('address')
          }) } />
      </div>
      <FormError field={'address'} />
    </div>
  )
}

const ComplaintantPhoneInput = () => { // Complaintant phone input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Phone:'}
          name={'phone'} />
        <input
          type="text"
          className={styles.input}
            { ...methods.register('phone', {
            pattern: {
              value: /^[0-9]*$/,
              message: 'Phone must contain only numbers'
            },
            minLength: {
              value: 10,
              message: 'Phone must be 10 characters'
            },
            maxLength: {
              value: 10,
              message: 'Phone must be 10 characters'
            },
            onChange: () => methods.trigger('phone')
            }) } />
      </div>
      <FormError field={'phone'} />
    </div> 
  )
}

const ComplaintantEmailInput = () => { // Complaintant email input
  const methods = useCreateSiteComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Email:'}
          name={'email'} />
        <input
          type="text"
          className={styles.input}
          { ...methods.register('email', {
            maxLength: {
              value: 50,
              message: 'Email must be 50 characters or less'
            },
            onChange: () => methods.trigger('email')
          }) } />
      </div>
      <FormError field={'email'} />
    </div>
  )
}