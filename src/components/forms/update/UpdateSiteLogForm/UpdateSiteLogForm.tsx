import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useGetSiteUUID } from "../../../../helpers"
import { useUpdateSiteLogForm, handleUpdateSiteLogFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Types
import { UpdateSiteLogFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function UpdateSiteLogForm({ siteLog, resetState }: UpdateSiteLogFormProps) {
  const methods = useUpdateSiteLogForm(siteLog)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="update-site-log-form" className={styles.container}>

      <div className={styles.title}>Update Site Log</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods && methods.handleSubmit(formData => handleUpdateSiteLogFormSubmit(formData, { resetState, invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]) }))} className={styles.body}>

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
                    onBlur: () => handleRequiredFieldValidation('inspectionDate', { watch: methods.watch, trigger: methods.trigger })
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

export default UpdateSiteLogForm