import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateSiteComplaintForm, useHandleFormSubmit, useHandleMapChange } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { CreateSiteComplaintFormProps } from "./types"

// Components
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import { Map, DateInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, ConcernSelect, OtherConcernInput, DetailsInput, CommentsInput, ComplaintantInputs, Buttons } from './components'

function CreateSiteComplaintForm({ site, date, handleCloseForm }: CreateSiteComplaintFormProps) {
  const { newSite } = useContext(MapContext)

  const methods = useCreateSiteComplaintForm(site, date)

  useHandleMapChange(newSite, { setValue: methods.setValue })

  const handleFormSubmit = useHandleFormSubmit(site?.uuid as string, handleCloseForm)

  return (
    <div data-testid="create-site-complaint-form" className={styles.container}>

      <h2 className={styles.title}>Create Complaint</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Map visible={!site} />

          <div className="flex gap-3 w-full">
            <DateInput />
            <InspectorSelect visible={!site} />
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
          </div>

          <Buttons handleCloseForm={handleCloseForm} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateSiteComplaintForm