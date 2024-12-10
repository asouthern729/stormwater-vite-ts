import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import AppContext from "../../../../context/App/AppContext"
import { useGetSiteUUID, handleDeleteBtnClick } from "../../../../helpers"
import { deleteFollowUp } from "../../../../context/App/AppActions"
import { useUpdateSiteIllicitDischargeForm, handleUpdateSiteIllicitDischargeFormSubmit, handleRequiredFieldValidation } from '.'
import styles from '../../Forms.module.css'

// Types
import { StreamWatershed } from "../../create/CreateSiteIllicitDischargeForm/types"
import { UpdateSiteIllicitDischargeFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import CreateFollowUpForm from "../../create/CreateFollowUpForm/CreateFollowUpForm"
import UpdateFollowUpForm from "../UpdateFollowUpForm/UpdateFollowUpForm"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import DeleteBtn from "../../../buttons/forms/DeleteBtn/DeleteBtn"

function UpdateSiteIllicitDischargeForm({ illicitDischarge, resetState }: UpdateSiteIllicitDischargeFormProps) {
  const { inspectorOptions } = useContext(AppContext)

  const methods = useUpdateSiteIllicitDischargeForm(illicitDischarge)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="update-site-illicit-discharge-form" className={styles.container}>

      <div className={styles.title}>Update Illicit Discharge</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateSiteIllicitDischargeFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites'), resetState }))} className={styles.body}>

          <div className="flex gap-3 w-full">
            <div className="flex-1 flex flex-col">
              <div className="flex">
                <FormLabel
                  label={'Illicit Discharge Date:'}
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

            {!illicitDischarge.siteId && ( // No associated site - show inspector question
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
            )}
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

          <section className="flex gap-3 w-full">
            <div className={styles.inputSection}>
              <div className="flex w-full">
                <FormLabel
                  label={'Stream / Watershed:'}
                  name={'streamWatershed'}
                  required={true} />
                <select 
                  className={styles.input}
                  { ...methods.register('streamWatershed', {
                    required: 'Stream / watershed is required',
                    onBlur: () => handleRequiredFieldValidation('streamWatershed', { watch: methods.watch, trigger: methods.trigger })
                  }) }>
                  <option value={''}></option>
                  {Object.values(StreamWatershed).map((streamWatershed) => (
                    <option key={streamWatershed} value={streamWatershed}>{streamWatershed}</option>
                  ))}
                </select>
                <FormError field={'streamWatershed'} />
              </div>
            </div>

            {methods.watch('streamWatershed') === 'Other' && (
              <div className={styles.inputSection}>
                <div className="flex">
                  <FormLabel
                    label={'Other Stream / Watershed:'}
                    name={'otherStreamWatershed'}
                    required={methods.watch('streamWatershed') === 'Other' ? true : false} />
                  <input 
                    type="text" 
                    className={styles.input}
                    { ...methods.register('otherStreamWatershed', {
                      required: methods.watch('streamWatershed') === 'Other' ? 'Stream / Watershed is required' : false,
                      maxLength: {
                        value: 50,
                        message: 'Stream / Watershed must be 50 characters or less'
                      },
                      onBlur: () => handleRequiredFieldValidation('otherStreamWatershed', { watch: methods.watch, trigger: methods.trigger })
                    }) } />
                </div>
                <FormError field={'otherStreamWatershed'} />
              </div>
            )}
          </section>

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
                        onBlur: () => handleRequiredFieldValidation('penaltyDate', { watch: methods.watch, trigger: methods.trigger })
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
              {illicitDischarge.FollowUpDates.length > 0 && (
                illicitDischarge.FollowUpDates.map(followUp => {
                  return (
                    <div key={`follow-up-${ followUp.uuid }`} className="flex flex-col gap-4 items-center p-10 pb-6 bg-error/10">
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

export default UpdateSiteIllicitDischargeForm