import { FormProvider } from "react-hook-form"
import { useCreateSiteLogForm, useHandleFormSubmit, useOnCancelBtnClick } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateSiteLogForm({ siteId }: { siteId: string }) {
  const methods = useCreateSiteLogForm(siteId)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Site Log</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <Components.DateInput />
            <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
        </FormProvider>

    </div>
  )
}

export default CreateSiteLogForm