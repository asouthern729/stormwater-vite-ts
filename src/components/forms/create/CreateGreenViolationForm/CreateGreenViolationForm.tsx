import { useContext } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import AppContext from "../../../../context/App/AppContext"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateGreenViolationForm, useHandleMapChange, handleCreateGreenInfrastructureViolationFormSubmit, handleRequiredFieldValidation } from '.'
import styles from '../../Forms.module.css'

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateGreenViolationForm() {
  const { inspectorOptions } = useContext(AppContext)
  const { newSite } = useContext(MapContext)

  const methods = useCreateGreenViolationForm()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Green Infrastructure Violation</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleCreateGreenInfrastructureViolationFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getGreenViolations'), navigate: () => navigate('/') }))} className={styles.body}>

          <div className={styles.mapDiv}>
            <MapContainer
              sites={[]}
              type={'create'}
              zoom={16} />
          </div>

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

          <div className={styles.buttonsContainer}>
            <SaveBtn disabled={!methods.formState.isValid} />
            <CancelBtn handleClick={() => navigate('/')} />
          </div>

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateGreenViolationForm