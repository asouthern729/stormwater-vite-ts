import { useNavigate } from 'react-router'
import { useCreateViolationFormContext } from './hooks'
import { handleRequiredFieldValidation } from './utils'
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../../../form-elements/FormLabel/FormLabel"
import FormError from "../../../../form-elements/FormError"
import SaveBtn from "../../../../form-elements/buttons/SaveBtn/SaveBtn"
import CancelBtn from "../../../../form-elements/buttons/CancelBtn/CancelBtn"

export const DateInput = () => { // Violation date input
  const methods = useCreateViolationFormContext()

  return (
    <div className={styles.inputSection}>
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

export const DetailsInput = () => { // Details input
  const methods = useCreateViolationFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Details:'}
          name={'details'}
          required={true} />
        <textarea
          className={styles.input}
          rows={4}
          { ...methods.register('details', {
          required: 'Violation details is required',
          maxLength: {
            value: 2000,
            message: 'Violation details must be 2000 characters or less'
          },
          onBlur: () => handleRequiredFieldValidation('details', { watch: methods.watch, trigger: methods.trigger }),
          onChange: () => methods.trigger('details')
        }) } />
      </div>
      <FormError field={'details'} />
    </div>
  )
}

export const EnforcementActionInput = () => { // Enforcement action input
  const methods = useCreateViolationFormContext()

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

export const SWOInputs = () => { // SWO inputs

  return (
    <div className="flex gap-3 w-full">
      <SWODateInput />
      <SWOLiftedDate />
    </div>
  )
}

export const PenaltyInputs = () => { // Penalty inputs

  return (
    <div className="flex gap-3 w-full flex-wrap">
      <PenaltyDateInput />
      <PenaltyAmountInput />
      <PenaltyDueDate />
      <PaymentReceivedDateInput />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: (() => void) | undefined }) => { // Form buttons
  const methods = useCreateViolationFormContext()

  const navigate = useNavigate()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm ? handleCloseForm : () => navigate('/')} />
    </div>
  )
}

const SWODateInput = () => { // SWO date
  const methods = useCreateViolationFormContext()

  return (
    <div className="flex-1 flex w-full">
      <FormLabel
        label={'SWO Date:'}
        name={'swoDate'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('swoDate') } />
    </div>
  )
}

const SWOLiftedDate = () => { // SWO lifted date
  const methods = useCreateViolationFormContext()

  const visible = !!methods.watch('swoDate')

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel
        label={'SWO Lifted Date:'}
        name={'swoLiftedDate'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('swoLiftedDate') } />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const methods = useCreateViolationFormContext()

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
  const methods = useCreateViolationFormContext()

  const visible = !!methods.watch('penaltyDate')

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Amount:'}
          name={'penaltyAmount'}
          required={true} />
        <input
          type="number"
          className={styles.input}
          { ...methods.register('penaltyAmount', {
            required: 'Penalty amount is required',
            onBlur: () => handleRequiredFieldValidation('penaltyAmount', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'penaltyAmount'} />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const methods = useCreateViolationFormContext()

  const visible = !!methods.watch('penaltyDate')

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Due Date:'}
          name={'penaltyDueDate'}
          required={true} />
        <input
          type="date"
          className={styles.input}
          { ...methods.register('penaltyDueDate', {
            required: 'Penalty due date is required',
            onBlur: () => handleRequiredFieldValidation('penaltyDueDate', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'penaltyDate'} />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const methods = useCreateViolationFormContext()

  const visible = !!methods.watch('penaltyDate')

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