import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateGreenViolationForm, useHandleMapChange, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import { DateInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, DetailsInput, CommentsInput, EnforcementActionInput, PenaltyDateInput, PenaltyAmountInput, PenaltyDueDateInput, PaymentReceivedDateInput, Buttons } from './components'

function CreateGreenViolationForm() {
  const { newSite } = useContext(MapContext)

  const methods = useCreateGreenViolationForm()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Create Green Infrastructure Violation</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <div className={styles.mapDiv}>
            <MapContainer
              sites={[]}
              type={'create'}
              zoom={16} />
          </div>

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

            <div className="flex gap-3 w-full flex-wrap">
              <div className="flex gap-3 w-full">
                <PenaltyDateInput />
                <PenaltyAmountInput />
              </div>
              <div className="flex gap-3 w-full">
                <PenaltyDueDateInput />
                <PaymentReceivedDateInput />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 py-10 w-full">
            
            <h3 className={styles.subtitle}>Follow Up</h3>

            <CreateFollowUpForm />
          </div>

          <Buttons />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateGreenViolationForm