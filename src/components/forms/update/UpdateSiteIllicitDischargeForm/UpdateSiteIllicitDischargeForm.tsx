import { FormProvider } from "react-hook-form"
import { useUpdateSiteIllicitDischargeForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { UpdateSiteIllicitDischargeFormProps } from "./types"

// Components
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, DetailsInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, StreamWatershedSelect, EnforcementActionInput, PenaltyInputs, Buttons } from '../../create/CreateSiteIllicitDischargeForm/components'
import { ExistingFollowUpsInputs, ComplianceCheckbox, ClosedCheckbox } from './components'

function UpdateSiteIllicitDischargeForm({ illicitDischarge, handleCloseForm }: UpdateSiteIllicitDischargeFormProps) {
  const methods = useUpdateSiteIllicitDischargeForm(illicitDischarge)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm)

  return (
    <div data-testid="update-site-illicit-discharge-form" className={styles.container}>

      <h2 className={styles.title}>Update Illicit Discharge</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <div className="flex gap-3 w-full">
            <DateInput />
            <InspectorSelect visible={!illicitDischarge.siteId && true} />
          </div>

          <div className="flex gap-3 w-full">
            <LocationDescriptionInput />
            <ResponsiblePartyInput />
          </div>

          <DetailsInput />
          <StreamWatershedSelect />

          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Enforcement</h3>

            <EnforcementActionInput />
          </div>

          <div className="flex flex-col gap-3 pb-10 w-full">
            <h3 className={styles.subtitle}>Penalty</h3>

            <PenaltyInputs />
          </div>

          <div className="flex flex-col gap-3 pb-10 w-full">
            <h3 className={styles.subtitle}>Follow Up</h3>

            <CreateFollowUpForm />
            <ExistingFollowUpsInputs 
              followUps={illicitDischarge.FollowUpDates}
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

export default UpdateSiteIllicitDischargeForm