import { useCreateInspectorFormContext } from "./hooks"
import { handleRequiredFieldValidation } from "./utils"
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

export const NameInput = () => { // Inspector name input
  const methods = useCreateInspectorFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Inspector Name:'}
          name={'name'}
          required={true} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('name', {
            required: 'Inspector name is required',
            maxLength: {
              value: 50,
              message: 'Site name must be 50 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'name'} />
    </div>
  )
}

export const EmailInput = () => { // Inspector email input
  const methods = useCreateInspectorFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Inspector Email:'}
          name={'email'}
          required={true} />
        <input 
          type="email"
          className={styles.input}
          { ...methods.register('email', {
            required: 'Inspector email is required',
            maxLength: {
              value: 50,
              message: 'Inspector email must be 50 characters or less'
            },
            onBlur: () => handleRequiredFieldValidation('email', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'email'} />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateInspectorFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
  )
}