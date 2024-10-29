import { FormProvider } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useCreateMultipleSiteLogsForm, handleCreateMultipleSiteLogsFormSubmit } from '.'
import styles from '../../Forms.module.css'

// Types
import { CreateMultipleSiteLogsFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateMultipleSiteLogsForm({ siteIds, resetState }: CreateMultipleSiteLogsFormProps) {
  const methods = useCreateMultipleSiteLogsForm(siteIds)

  const queryClient = useQueryClient()

  const inspectorId = useLocation().pathname.split('/')[-1]

  return (
    <div data-testid="create-site-log-form" className={styles.container}>

      <div className={styles.title}>Create Site Log</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(formData => handleCreateMultipleSiteLogsFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries(['getInspector', inspectorId]), resetState }))} className={styles.body}>

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Inspection Date:'}
                  name={'inspectionDate'}
                  required={true} />
                <input 
                  type="date"
                  className={styles.input}
                  { ...methods.register('inspectionDate', {
                    required: 'Inspection date is required',
                    onBlur: () => methods.trigger('inspectionDate')
                  }) } />
              </div>
              <FormError field={'inspectionDate'} />
            </div>

            <div className={styles.buttonsContainer}>
              <SaveBtn disabled={!methods.formState.isValid} />
              <CancelBtn handleClick={resetState} />
            </div>

          </form>
        </FormProvider>

    </div>
  )
}

export default CreateMultipleSiteLogsForm