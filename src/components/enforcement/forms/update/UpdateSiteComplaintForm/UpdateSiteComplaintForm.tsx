import { FormProvider } from "react-hook-form"
import { useUpdateSiteComplaintForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { ComplaintInterface } from "@/context/App/types"

// Components
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, ConcernSelect, OtherConcernInput, DetailsInput, CommentsInput, ComplaintantInputs, Buttons } from '../../create/CreateSiteComplaintForm/components'
import { ExistingFollowUpsInputs, ComplianceCheckbox, ClosedCheckbox } from './components'

function UpdateSiteComplaintForm({ complaint }: { complaint: ComplaintInterface }) {
  const methods = useUpdateSiteComplaintForm(complaint)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm)

  return (
    <div data-testid="update-site-complaint-form" className={styles.container}>

      <h2 className={styles.title}>Update Complaint</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <div className="flex gap-3 w-full">
              <DateInput />
              <InspectorSelect visible={!!complaint.siteId} />
            </div>

            <div className="flex gap-3 w-full">
              <LocationDescriptionInput />
              <ResponsiblePartyInput />
            </div>

            <div className="flex gap-3 w-full">
              <ConcernSelect />
              <OtherConcernInput />
            </div>

            <DetailsInput />
            <CommentsInput />

            <div className="flex flex-col gap-3 py-10 w-full">
              <h3 className={styles.subtitle}>Complaintant</h3>
              
              <ComplaintantInputs />
            </div>

            <div className="flex flex-col gap-3 pb-10 w-full">
              <h3 className={styles.subtitle}>Follow Up</h3>

              <CreateFollowUpForm />
              <ExistingFollowUpsInputs 
                followUps={complaint.FollowUpDates}
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

export default UpdateSiteComplaintForm