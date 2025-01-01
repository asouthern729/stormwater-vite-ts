import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateSiteIllicitDischargeForm, useHandleMapChange, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { CreateSiteIllicitDischargeFormProps } from "./types"

// Components
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import { Map, DateInput, InspectorSelect, LocationDescriptionInput, ResponsiblePartyInput, DetailsInput, StreamWatershedSelect, EnforcementActionInput, PenaltyInputs, Buttons } from "./components"

function CreateSiteIllicitDischargeForm({ site, date, resetState }: CreateSiteIllicitDischargeFormProps) {
  const { newSite } = useContext(MapContext)

  const methods = useCreateSiteIllicitDischargeForm(site, date)

  useHandleMapChange(newSite, { setValue: methods.setValue })

  const handleFormSubmit = useHandleFormSubmit(resetState, site?.uuid as string)

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Create Illicit Discharge</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Map visible={!site && true} />

          <div className="flex gap-3 w-full">
            <DateInput />
            <InspectorSelect visible={!site && true} />
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

          <div className="flex flex-col gap-3 w-full">
            <h3 className={styles.subtitle}>Penalty</h3>

            <PenaltyInputs />
          </div>

          <div className="flex flex-col gap-3 py-10 w-full">
            <h3 className={styles.subtitle}>Follow Up</h3>

            <CreateFollowUpForm />
          </div>

          <Buttons resetState={resetState} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateSiteIllicitDischargeForm