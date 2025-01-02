import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import { useCreateGreenViolationFormContext } from "./hooks"
import { handleRequiredFieldValidation } from "./utils"
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

export const DateInput = () => { // Violation date input
  const methods = useCreateGreenViolationFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Violation Date:'}
          name={'date'}
          required={true} />
        <input 
          type="date"
          className={styles.input}
          { ...methods.register('date', {
            required: 'Violation date is required',
            onBlur: () => handleRequiredFieldValidation('date', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'date'} />
    </div>
  )
}

export const InspectorSelect = () => { // Inspector select
  const { inspectorOptions } = useContext(AppContext)

  const methods = useCreateGreenViolationFormContext()

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

export const LocationDescriptionInput = () => { // Violation location description input
  const methods = useCreateGreenViolationFormContext()

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
  const methods = useCreateGreenViolationFormContext()

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
            }
          }) } />
      </div>
      <FormError field={'responsibleParty'} />
    </div>
  )
}

export const DetailsInput = () => { // Violation details input
  const methods = useCreateGreenViolationFormContext()

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
            onBlur: () => handleRequiredFieldValidation('details', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'details'} />
    </div>
  )
}

export const CommentsInput = () => { // Comments input
  const methods = useCreateGreenViolationFormContext()

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
            }
          }) } />
      </div>
      <FormError field={'comments'} />
    </div>
  )
}

export const EnforcementActionInput = () => { // Enforcement action input
  const methods = useCreateGreenViolationFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Action:'}
          name={'enforcementAction'} />
        <textarea
          className={styles.input}
          rows={4}
          { ...methods.register('enforcementAction', {
            maxLength: {
              value: 2000,
              message: 'Enforcement action must be 2000 characters or less'
            },
            onChange: () => methods.trigger('enforcementAction')
          }) } />
      </div>
      <FormError field={'enforcementAction'} />
    </div>
  )
}

export const PenaltyInputs = () => { // Penalty inputs

  return (
    <div className="flex gap-3 w-full flex-wrap">
      <PenaltyDateInput />
      <PenaltyAmountInput />
      <PenaltyDueDateInput />
      <PaymentReceivedDateInput />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateGreenViolationFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const methods = useCreateGreenViolationFormContext()

  return (
    <div className="flex-2 flex w-full">
      <FormLabel
        label={'Date:'}
        name={'penaltyDate'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('penaltyDate') } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const methods = useCreateGreenViolationFormContext()

  const visible = methods.watch('penaltyDate') ? true : false

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Amount:'}
          name={'penaltyAmount'}
          required={methods.watch('penaltyDate') ? true : false} />
        <input
          type="number"
          className={styles.input}
          { ...methods.register('penaltyAmount', {
            required: methods.watch('penaltyDate') ? 'Penalty amount is required' : false,
            onBlur: () => handleRequiredFieldValidation('penaltyAmount', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'penaltyAmount'} />
    </div>
  )
}

const PenaltyDueDateInput = () => { // Penalty due date input
  const methods = useCreateGreenViolationFormContext()

  const visible = methods.watch('penaltyDate') ? true : false

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Due Date:'}
          name={'penaltyDueDate'}
          required={methods.watch('penaltyDate') ? true : false} />
        <input
          type="date"
          className={styles.input}
          { ...methods.register('penaltyDueDate', {
            required: methods.watch('penaltyDate') ? 'Penalty due date is required' : false,
            onBlur: () => handleRequiredFieldValidation('penaltyDueDate', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'penaltyDate'} />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const methods = useCreateGreenViolationFormContext()

  const visible = methods.watch('penaltyDate') ? true : false

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel
        label={'Received Date:'}
        name={'paymentReceived'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('paymentReceived') } />
    </div>
  )
}