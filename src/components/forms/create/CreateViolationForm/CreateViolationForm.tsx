import { FormProvider } from "react-hook-form"
import { useCreateViolationForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { CreateViolationFormProps } from "./types"

// Components
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, DetailsInput, EnforcementActionInput, SWOInputs, PenaltyInputs, ComplianceCheckbox, ClosedCheckbox, Buttons } from './components'

function CreateViolationForm({ site, date, resetState }: CreateViolationFormProps) {
  const methods = useCreateViolationForm(site, date)

  const handleFormSubmit = useHandleFormSubmit(resetState, site.uuid)

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

          <div className="flex justify-between gap-20 pb-10 m-auto w-fit">
            <ComplianceCheckbox />
            <ClosedCheckbox />
          </div>

          <Buttons resetState={resetState} />

        </form>
      </FormProvider>
    </div>
  )
}

export default CreateViolationForm