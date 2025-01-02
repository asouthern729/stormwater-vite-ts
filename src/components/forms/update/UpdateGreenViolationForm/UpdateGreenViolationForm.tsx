import { FormProvider } from "react-hook-form"
import { useUpdateGreenViolationForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { UpdateGreenViolationFormProps } from "./types"

// Components
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, DetailsInput, CommentsInput, EnforcementActionInput, PenaltyInputs, Buttons } from '../../create/CreateGreenViolationForm/components'

function UpdateGreenViolationForm({ green, handleCloseForm }: UpdateGreenViolationFormProps) {
  const methods = useUpdateGreenViolationForm(green)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm)

  return (
    <div data-testid="update-green-violation-form" className={styles.container}>

      <h2 className={styles.title}>Update Green Infrastructure Violation</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <div className="flex gap-3 w-full">
            <DateInput />
            <InspectorSelect />
          </div>

          <div className="flex gap-3 w-full">
            <LocationDescriptionInput />
            <ResponsiblePartyInput />
          </div>

          <DetailsInput />
          <CommentsInput />

          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Enforcement</h3>

            <EnforcementActionInput />
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

export default UpdateGreenViolationForm