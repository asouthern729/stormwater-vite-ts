import { useFormContext } from "react-hook-form"
import styles from '../../Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormLabel from "../../../../form-elements/FormLabel/FormLabel"

function CreateFollowUpForm({ index }: { index: number }) {
  const { register } = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  return (
    <div className="flex w-full">
      <FormLabel name={`FollowUpDates.${ index }.followUpDate`}>
        New Follow Up Date:
      </FormLabel>
      <input 
        type="date"
        className={styles.input}
        { ...register(`FollowUpDates.${ index }.followUpDate`) } />
    </div>
  )
}

export default CreateFollowUpForm