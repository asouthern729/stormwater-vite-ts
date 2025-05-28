import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import { useUpdateViolationForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { ConstructionViolationInterface } from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { DateInput, DetailsInput, EnforcementInputs, PenaltyInputs, FollowUpInputs } from '@/components/enforcement/forms/create/CreateViolationForm/components'
import * as Components from './components'

function UpdateViolationForm({ violation }: { violation: ConstructionViolationInterface }) {
  const methods = useUpdateViolationForm(violation)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Construction Violation</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <DateInput />
          <DetailsInput />
          <EnforcementInputs />
          <PenaltyInputs />
          <FollowUpInputs />
          <Components.CheckboxInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateViolationForm