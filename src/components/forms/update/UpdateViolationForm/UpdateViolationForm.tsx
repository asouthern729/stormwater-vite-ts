import { FormProvider } from "react-hook-form"
import { useUpdateViolationForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { UpdateViolationFormProps } from "./types"

// Components
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, DetailsInput, EnforcementActionInput, SWOInputs, PenaltyInputs, Buttons } from '../../create/CreateViolationForm/components'
import { ExistingFollowUpsInputs, ComplianceCheckbox, ClosedCheckbox } from './components'

function UpdateViolationForm({ violation, handleCloseForm }: UpdateViolationFormProps) {
  const methods = useUpdateViolationForm(violation)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm)

  return (
    <div data-testid="update-violation-form" className={styles.container}>

      <h2 className={styles.title}>Update Construction Violation</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <DateInput />
          <DetailsInput />

          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Enforcement</h3>

            <EnforcementActionInput />
            <SWOInputs />
          </div>

          <div className="flex flex-col gap-3 pb-10 w-full">
            <h3 className={styles.subtitle}>Penalty</h3>

            <PenaltyInputs />
          </div>
          
          <div className="flex flex-col gap-3 pb-10 w-full">
            <h3 className={styles.subtitle}>Follow Up</h3>

            <CreateFollowUpForm />
            <ExistingFollowUpsInputs 
              followUps={violation.FollowUpDates}
              handleCloseForm={handleCloseForm} />
          </div>

          <div className="flex justify-between gap-20 pb-10 m-auto w-fit">
            <ComplianceCheckbox />
            <ClosedCheckbox />
          </div>

          <Buttons handleCloseForm={handleCloseForm} />

        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateViolationForm