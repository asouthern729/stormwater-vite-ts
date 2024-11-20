import { useContext } from "react"
import { useQueryClient } from "react-query"
import { FormProvider } from "react-hook-form"
import AppContext from "../../../../context/App/AppContext"
import { handleDeleteBtnClick } from "../../../../helpers"
import { deleteFollowUp } from "../../../../context/App/AppActions"
import { handleUpdateGreenViolationFormSubmit, handleRequiredFieldValidation } from '.'
import styles from '../../Forms.module.css'

// Types
import { UpdateGreenViolationFormProps } from "./types"
import { useUpdateGreenViolationForm } from "."

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import UpdateFollowUpForm from "../UpdateFollowUpForm/UpdateFollowUpForm"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function UpdateGreenViolationForm({ green, resetState }: UpdateGreenViolationFormProps) {
  const { inspectorOptions } = useContext(AppContext)

  const methods = useUpdateGreenViolationForm(green)

  const queryClient = useQueryClient()

  return (
    <div data-testid="update-green-violation-form" className={styles.container}>

      <div className={styles.title}>Update Green Infrastructure Violation</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateGreenViolationFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations'), resetState }))} className={styles.body}>

          <div className="flex gap-3 w-full">
            <div className="flex-1 flex flex-col">
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

            <div className="flex-1 flex flex-col">
              <div className="flex">
                <FormLabel
                  label={'Inspector:'}
                  name={'inspectorId'} />
                <select 
                  className={styles.input}
                  { ...methods.register('inspectorId') }>
                    <option value={''}></option>
                    {inspectorOptions.map((inspector) => (
                      <option key={inspector.value} value={inspector.value}>
                        {inspector.text}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-1 flex flex-col">
              <div className="flex">
                <FormLabel
                  label={'Location Description:'}
                  name={'locationDescription'} />
                <input 
                  type="text"
                  className={styles.input}
                  { ...methods.register('locationDescription', {
                    maxLength: {
                      value: 50,
                      message: 'Location description must be 50 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'locationDescription'} />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex">
                <FormLabel
                  label={'Responsible Party:'}
                  name={'responsibleParty'} />
                <input 
                  type="text"
                  className={styles.input}
                  { ...methods.register('responsibleParty', {
                    maxLength: {
                      value: 50,
                      message: 'Responsible party must be 50 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'responsibleParty'} />
            </div>
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Details:'}
                name={'details'}
                required={true} />
              <textarea 
                rows={3} 
                className={styles.input}
                { ...methods.register('details', {
                  required: 'Complaint details is required',
                  maxLength: {
                    value: 2000,
                    message: 'Complaint details must be 2000 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('details', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'details'} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Comments:'}
                name={'comments'} />
              <textarea 
                rows={3} 
                className={styles.input}
                { ...methods.register('comments', {
                  maxLength: {
                    value: 2000,
                    message: 'Comments must be 2000 characters or less'
                  }
                }) } />
            </div>
            <FormError field={'comments'} />
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
          </section>

          <section className="flex flex-col gap-3 pb-10 w-full">
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

          <div className="flex flex-col gap-3 pb-10 w-full">
              <div className={styles.subtitle}>Follow Up</div>
              <CreateFollowUpForm />
                {green.FollowUpDates.length > 0 && (
                  green.FollowUpDates.map(followUp => {
                    return (
                      <div key={`follow-up-${ followUp.uuid }`} className="flex flex-col gap-4 items-center p-10 pb-6 bg-error/10">
                        <UpdateFollowUpForm followUp={followUp} />
                        <DeleteBtn
                          label={'Delete Follow Up'}
                          handleClick={() => handleDeleteBtnClick(followUp.uuid, true, deleteFollowUp, { invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations'), resetState })} />
                      </div>
                    )
                  })
                )}
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

export default UpdateGreenViolationForm