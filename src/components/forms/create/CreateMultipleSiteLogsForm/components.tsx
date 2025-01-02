import { useCreateMultipleSiteLogsFormContext } from "./hooks"
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

export const DateInput = () => { // Inspection date input
  const methods = useCreateMultipleSiteLogsFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Inspection Date:'}
          name={'inspectionDate'}
          required={true} />
        <input 
          type="date"
          className={styles.input}
          { ...methods.register('inspectionDate', {
            required: 'Inspection date is required',
            onBlur: () => methods.trigger('inspectionDate')
          }) } />
      </div>
      <FormError field={'inspectionDate'} />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useCreateMultipleSiteLogsFormContext()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting && true

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
  )
}