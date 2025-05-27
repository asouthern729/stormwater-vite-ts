import { FormProvider } from "react-hook-form"
import { useGetSiteUUID } from "../../../../../helpers/hooks"
import { useCreateSiteLogForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { CreateSiteLogFormProps } from "./types"

// Components
import { DateInput, Buttons } from './components'

function CreateSiteLogForm({ siteId, date, handleCloseForm }: CreateSiteLogFormProps) {
  const methods = useCreateSiteLogForm(siteId, date)

  const siteUUID = useGetSiteUUID()

  const handleFormSubmit = useHandleFormSubmit(handleCloseForm, siteUUID as string)

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

export default CreateSiteLogForm