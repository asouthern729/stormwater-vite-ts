import { useCreateContactFormContext } from './hooks'
import { handleRequiredFieldValidation } from './utils'
import styles from '../../Forms.module.css'

// Components
import FormLabel from '../../../../form-elements/FormLabel/FormLabel'
import FormError from '../../../../form-elements/FormError'
import SaveBtn from '../../../../form-elements/buttons/SaveBtn/SaveBtn'
import CancelBtn from '../../../../form-elements/buttons/CancelBtn/CancelBtn'

export const NameInput = () => { // Contact name input
  const methods = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Contact Name:'}
          name={'name'}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('name', {
            required: 'Contact name is required',
            maxLength: {
              value: 50,
              message: 'Contact name must be 50 characters or less'
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'No special characters or numbers'
            },
            onChange: () => methods.trigger('name'),
            onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'name'} />
    </div>
  )
}

export const CompanyInput = () => { // Company input
  const methods = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Company'}
          name={'company'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('company', {
            maxLength: {
              value: 50,
              message: 'Company must be 50 characters or less'
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'No special characters or numbers'
            },
            onChange: () => methods.trigger('company')
          }) } />
      </div>
      <FormError field={'company'} />
    </div>
  )
}

export const PhoneInput = () => { // Phone input
  const methods = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Phone:'}
          name={'phone'} />
        <input 
          type="tel"
          className={styles.input}
          { ...methods.register('phone', {
            minLength: {
              value: 10,
              message: 'Required format ex: 6155506691'
            },
            maxLength: {
              value: 10,
              message: 'Required format ex: 6155506691'
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Required format ex: 6155506691'
            },
            onChange: () => methods.trigger('phone')
          }) } />
      </div>
      <FormError field={'phone'} />
    </div>
  )
}

export const EmailInput = () => { // Email input
  const methods = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Email:'}
          name={'email'} />
        <input 
          type="email"
          className={styles.input}
          { ...methods.register('email', {
            maxLength: {
              value: 50,
              message: 'Email must be 50 characters or less'
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Required format ex: bin.franklin@franklintn.gov'
            },
            onChange: () => methods.trigger('email')
          }) } />
      </div>
      <FormError field={'email'} />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateContactFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
  )
}