import { useFormContext } from "react-hook-form"
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../../../form-elements/FormLabel/FormLabel"

function CreateFollowUpForm() {
  const { register } = useFormContext()

  return (
    <div className="flex w-full">
      <FormLabel
        label={'New Follow Up Date:'}
        name={'followUpDate'} />
      <input 
        type="date"
        className={styles.input}
        { ...register('followUpDate') } />
    </div>
  )
}

export default CreateFollowUpForm