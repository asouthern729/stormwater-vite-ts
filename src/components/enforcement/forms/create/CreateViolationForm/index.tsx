import { FormProvider } from "react-hook-form"
import { useCreateViolationForm, useHandleFormSubmit, useOnCancelBtnClick } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { SiteInterface } from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateViolationForm({ site }: { site: SiteInterface }) {
  const methods = useCreateViolationForm(site)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Construction Violation</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.DateInput />
          <Components.DetailsInput />
          <Components.EnforcementInputs />
          <Components.PenaltyInputs />
          <Components.FollowUpInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
    </div>
  )
}

export default CreateViolationForm