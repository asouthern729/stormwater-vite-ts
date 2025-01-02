import { FormProvider } from "react-hook-form"
import { useUpdateSiteLogForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { UpdateSiteLogFormProps } from "./types"

// Components
import { DateInput, Buttons } from '../../create/CreateSiteLogForm/components'

function UpdateSiteLogForm({ siteLog, handleCloseForm }: UpdateSiteLogFormProps) {
  const methods = useUpdateSiteLogForm(siteLog)

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm)

  return (
    <div data-testid="update-site-log-form" className={styles.container}>

      <h2 className={styles.title}>Update Site Log</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <DateInput />
            <Buttons handleCloseForm={handleCloseForm} />

          </form>
        </FormProvider>
        
    </div>
  )
}

export default UpdateSiteLogForm