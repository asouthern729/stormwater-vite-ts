import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useCreateViolationForm, handleCreateViolationFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Types
import { CreateViolationFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateViolationForm({ site, date, resetState }: CreateViolationFormProps) {
  const methods = useCreateViolationForm(site, date)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Construction Violation</div>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleCreateViolationFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries(['getSite', site.uuid]), resetState, navigate }))} className={styles.body}>

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

          <section className="flex flex-col gap-3 py-10 w-full">
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

          <section className="flex flex-col gap-3 w-full">
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
                        onBlur: () => handleRequiredFieldValidation('penaltyDueDate', { watch: methods.watch, trigger: methods.trigger })
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
          
          <div className="flex flex-col gap-3 py-10 w-full">
            <div className={styles.subtitle}>Follow Up</div>
            <CreateFollowUpForm />
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
            <CancelBtn handleClick={resetState ? resetState : () => navigate('/')} />
          </div>

        </form>
      </FormProvider>
    </div>
  )
}

export default CreateViolationForm