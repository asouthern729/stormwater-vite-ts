import { setDateForForm } from "../../../../helpers"
import styles from '../../Forms.module.css'

// Types
import { UpdateFollowUpFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"

function UpdateFollowUpForm({ followUp }: UpdateFollowUpFormProps) {
  return (
    <div className="flex w-full">
      <FormLabel
        label={'Existing Follow Up Date:'}
        name={'followUpDate'} />
      <input 
        type="date"
        className={styles.input}
        value={setDateForForm(followUp.followUpDate)}
        disabled={true} />
    </div>
  )
}

export default UpdateFollowUpForm