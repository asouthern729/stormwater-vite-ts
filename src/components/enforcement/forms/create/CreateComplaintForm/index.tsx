import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "../CreateViolationForm/hooks"
import { useCreateComplaintForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { FollowUpInputs } from "../CreateViolationForm/components"
import * as Components from './components'

function CreateComplaintForm({ site }: { site: AppTypes.SiteInterface | undefined }) {
  const methods = useCreateComplaintForm(site)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Complaint</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.Map visible={!site} />
          <Components.DateAndInspectorInputs siteId={site?.siteId} />
          <Components.LocationAndResponsiblePartyInputs />
          <Components.DetailsInput />
          <Components.ConcernInputs />
          <Components.CommentsInput />
          <Components.ComplaintantInputs />
          <FollowUpInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateComplaintForm