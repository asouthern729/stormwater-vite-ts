import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useGetSiteUUID } from "../../../../helpers"
import { useCreateSiteLogForm, handleCreateSiteLogFormSubmit } from "."
import styles from '../../Forms.module.css'

// Types
import { CreateSiteLogFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateSiteLogForm({ siteId, date, resetState }: CreateSiteLogFormProps) {
  const methods = useCreateSiteLogForm(siteId, date)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Site Log</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(formData => handleCreateSiteLogFormSubmit(formData, { invalidateQuery: queryClient.invalidateQueries(['getSite', siteUUID]), resetState }))} className={styles.body}>

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
                    required: {
                      value: true,
                      message: 'Inspection date is required'
                    }
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

export default CreateSiteLogForm