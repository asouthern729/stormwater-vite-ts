import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useGetSiteUUID, handleDeleteBtnClick } from "../../../../helpers"
import { deleteFollowUp } from "../../../../context/App/AppActions"
import { useUpdateViolationForm, handleUpdateViolationFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Types
import { UpdateViolationFormProps } from "./types"

// Components
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import UpdateFollowUpForm from "../UpdateFollowUpForm/UpdateFollowUpForm"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function UpdateViolationForm({ violation, resetState }: UpdateViolationFormProps) {
  const methods = useUpdateViolationForm(violation)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="update-violation-form" className={styles.container}>

      <div className={styles.title}>Update Construction Violation</div>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateViolationFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites'), resetState }))} className={styles.body}>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Violation Date:'}
                name={'date'}
                required={true} />
              <input 
                type="date"
                className={styles.input}
                { ...methods.register('date', {
                  required: 'Violation date is required',
                  onBlur: () => handleRequiredFieldValidation('date', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'date'} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Details:'}
                name={'details'}
                required={true} />
              <textarea
                className={styles.input}
                rows={4}
                { ...methods.register('details', {
                required: 'Violation details is required',
                maxLength: {
                  value: 2000,
                  message: 'Violation details must be 2000 characters or less'
                },
                onBlur: () => handleRequiredFieldValidation('details', { watch: methods.watch, trigger: methods.trigger })
              }) } />
            </div>
            <FormError field={'details'} />
          </div>

          <section className="flex flex-col gap-3 pb-10 w-full">
            <div className={styles.subtitle}>Enforcement</div>
            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Action:'}
                  name={'enforcementAction'} />
                <textarea
                  className={styles.input}
                  rows={4}
                  { ...methods.register('enforcementAction', {
                    maxLength: {
                      value: 2000,
                      message: 'Enforcement action must be 2000 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'enforcementAction'} />
            </div>

            <div className="flex gap-3 w-full">
              <div className="flex w-full">
                <FormLabel
                  label={'SWO Date:'}
                  name={'swoDate'} />
                <input
                  type="date"
                  className={styles.input}
                  { ...methods.register('swoDate') } />
              </div>

              <div className="flex w-full">
                <FormLabel
                  label={'SWO Lifted Date:'}
                  name={'swoLiftedDate'} />
                <input
                  type="date"
                  className={styles.input}
                  { ...methods.register('swoLiftedDate') } />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 py-10 w-full">
            <div className={styles.subtitle}>Penalty</div>
            <div className="flex gap-3 w-full flex-wrap">

              <div className="flex gap-3 w-full">
                <div className="flex w-full">
                  <FormLabel
                    label={'Date:'}
                    name={'penaltyDate'} />
                  <input
                    type="date"
                    className={styles.input}
                    { ...methods.register('penaltyDate') } />
                </div>

                <div className={styles.inputSection}>
                  <div className="flex">
                    <FormLabel
                      label={'Amount:'}
                      name={'penaltyAmount'}
                      required={methods.watch('penaltyDate') ? true : false} />
                    <input
                      type="number"
                      className={styles.input}
                      { ...methods.register('penaltyAmount', {
                        required: methods.watch('penaltyDate') ? 'Penalty amount is required' : false,
                        onBlur: () => handleRequiredFieldValidation('penaltyAmount', { watch: methods.watch, trigger: methods.trigger })
                      }) } />
                  </div>
                  <FormError field={'penaltyAmount'} />
                </div>
              </div>
              
              <div className="flex gap-3 w-full">

                <div className={styles.inputSection}>
                  <div className="flex">
                    <FormLabel
                      label={'Due Date:'}
                      name={'penaltyDueDate'}
                      required={methods.watch('penaltyDate') ? true : false} />
                    <input
                      type="date"
                      className={styles.input}
                      { ...methods.register('penaltyDueDate', {
                        required: methods.watch('penaltyDate') ? 'Penalty due date is required' : false,
                        onBlur: () => handleRequiredFieldValidation('penaltyDate', { watch: methods.watch, trigger: methods.trigger })
                      }) } />
                  </div>
                  <FormError field={'penaltyDate'} />
                </div>

                <div className="flex w-full">
                  <FormLabel
                    label={'Received Date:'}
                    name={'paymentReceived'} />
                  <input
                    type="date"
                    className={styles.input}
                    { ...methods.register('paymentReceived') } />
                </div>

              </div>
            </div>
          </section>
          
          <div className="flex flex-col gap-3 pb-10 w-full">
            <div className={styles.subtitle}>Follow Up</div>
            <CreateFollowUpForm />
            {violation.FollowUpDates.length > 0 && (
              violation.FollowUpDates.map(followUp => {
                return (
                  <div key={`follow-up-form-${ followUp.uuid }`} className="flex flex-col gap-4 items-center p-10 pb-6 bg-error/10">
                    <UpdateFollowUpForm followUp={followUp} />
                    <DeleteBtn
                      label={'Delete Follow Up'}
                      handleClick={() => handleDeleteBtnClick(followUp.uuid, true, deleteFollowUp, { invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]), resetState })} />
                  </div>
                )
              })
            )}
          </div>

          <section className="flex justify-between gap-20 pb-10 m-auto w-fit">
            <div className="flex flex-col gap-1 items-center">
              <label htmlFor="compliance" className={styles.checkboxLabel}>Compliance:</label>
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                { ...methods.register('compliance') } />
            </div>

            <div className="flex flex-col gap-1 items-center">
              <label htmlFor="closed" className={styles.checkboxLabel}>Closed:</label>
              <input
                type="checkbox"
                className="checkbox checkbox-warning"
                { ...methods.register('closed') } />
            </div>
          </section>

          <div className={styles.buttonsContainer}>
            <SaveBtn disabled={!methods.formState.isValid} />
            <CancelBtn handleClick={resetState} />
          </div>

        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateViolationForm