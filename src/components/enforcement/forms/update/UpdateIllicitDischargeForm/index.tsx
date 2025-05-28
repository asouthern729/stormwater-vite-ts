import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import { useUpdateIllicitDischargeForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { IllicitDischargeInterface } from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { Map, DateAndInspectorInputs, LocationAndResponsiblePartyInputs, DetailsInput, StreamWatershedSelect, EnforcementInputs, PenaltyInputs } from '../../create/CreateIllicitDischargeForm/components'
import { FollowUpInputs } from "../../create/CreateViolationForm/components"
import { CheckboxInputs } from "../UpdateViolationForm/components"

function UpdateIllicitDischargeForm({ illicitDischarge }: { illicitDischarge: IllicitDischargeInterface }) {
  const methods = useUpdateIllicitDischargeForm(illicitDischarge)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div data-testid="update-site-illicit-discharge-form" className={styles.container}>
      <h2 className={styles.title}>Update Illicit Discharge</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Map visible={!illicitDischarge.siteId} />
          <DateAndInspectorInputs site={illicitDischarge.siteId} />
          <LocationAndResponsiblePartyInputs />
          <DetailsInput />
          <StreamWatershedSelect />
          <EnforcementInputs />
          <PenaltyInputs />
          <FollowUpInputs />
          <CheckboxInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
      
    </div>
  )
}

export default UpdateIllicitDischargeForm