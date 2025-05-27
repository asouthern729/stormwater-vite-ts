import { FormProvider } from "react-hook-form"
import { useCreateViolationForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { CreateViolationFormProps } from "./types"

// Components
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, DetailsInput, EnforcementActionInput, SWOInputs, PenaltyInputs, Buttons } from './components'

function CreateViolationForm({ site, date, handleCloseForm }: CreateViolationFormProps) {
  const methods = useCreateViolationForm(site, date)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm, site.uuid)

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Create Construction Violation</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <DateInput />
          <DetailsInput />

          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Enforcement</h3>

            <EnforcementActionInput />
            <SWOInputs />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <h3 className={styles.subtitle}>Penalty</h3>

            <PenaltyInputs />
          </div>
          
          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Follow Up</h3>

            <CreateFollowUpForm />
          </div>

          <Buttons handleCloseForm={handleCloseForm} />

        </form>
      </FormProvider>
    </div>
  )
}

export default CreateViolationForm