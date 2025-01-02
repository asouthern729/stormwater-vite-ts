import { FormProvider } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { useCreateMultipleSiteLogsForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { CreateMultipleSiteLogsFormProps } from "./types"

// Components
import { DateInput, Buttons } from './components'

function CreateMultipleSiteLogsForm({ siteIds, handleCloseForm }: CreateMultipleSiteLogsFormProps) {
  const methods = useCreateMultipleSiteLogsForm(siteIds)

  const inspectorId = useLocation().pathname.split('/')[-1]

  const handleFormSubmit = useHandleFormSubmit(inspectorId, handleCloseForm)

  return (
    <div data-testid="create-site-log-form" className={styles.container}>

      <h2 className={styles.title}>Create Site Log</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <DateInput />
            <Buttons handleCloseForm={handleCloseForm} />

          </form>
        </FormProvider>

    </div>
  )
}

export default CreateMultipleSiteLogsForm