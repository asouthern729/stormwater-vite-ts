import { useFormContext } from "react-hook-form"
import { handleRequiredFieldValidation } from "./utils"
import styles from '../../Forms.module.css'

// Types
import { CreateSiteLogFormUseForm } from "./types"

// Components
import FormLabel from "../../../../form-elements/FormLabel/FormLabel"
import FormError from "../../../../form-elements/FormError"
import SaveBtn from "../../../../form-elements/buttons/SaveBtn/SaveBtn"
import CancelBtn from "../../../../form-elements/buttons/CancelBtn/CancelBtn"

export const DateInput = () => { // Inspection date input
  const methods = useFormContext<CreateSiteLogFormUseForm>()

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
            onBlur: () => handleRequiredFieldValidation('inspectionDate', { watch: methods.watch, trigger: methods.trigger })
          }) } />
      </div>
      <FormError field={'inspectionDate'} />
    </div>
  )
}

export const Buttons = ({ handleCloseForm }: { handleCloseForm: () => void }) => { // Form buttons
  const methods = useFormContext<CreateSiteLogFormUseForm>()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={handleCloseForm} />
    </div>
)
}