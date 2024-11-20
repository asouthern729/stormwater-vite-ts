import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../../context/App/AppContext"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateSiteIllicitDischargeForm, useHandleMapChange, handleCreateSiteIllicitDischargeFormSubmit } from "."
import styles from '../../Forms.module.css'

// Types
import { CreateSiteIllicitDischargeFormProps, StreamWatershed } from "./types"

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateSiteIllicitDischargeForm({ site, date, resetState }: CreateSiteIllicitDischargeFormProps) {
  const { inspectorOptions } = useContext(AppContext)
  const { newSite } = useContext(MapContext)

  const methods = useCreateSiteIllicitDischargeForm(site, date)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Illicit Discharge</div>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleCreateSiteIllicitDischargeFormSubmit(formData, site?.uuid || '', { invalidateQuery: () => queryClient.invalidateQueries(['getSite', site?.uuid]), resetState, navigate }))} className={styles.body}>

          {!site && ( // No associated site - show map
            <div className={styles.mapDiv}>
              <MapContainer
                sites={[]}
                type={'create'}
                zoom={16} />
            </div>
          )}

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
                    required: {
                      value: true,
                      message: 'Violation date is required'
                    },
                    onBlur: () => methods.trigger('date')
                  }) } />
              </div>
              <FormError field={'date'} />
            </div>

            {!site && ( // No associated site - show inspector question
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
                required: {
                  value: true,
                  message: 'Violation details is required'
                },
                maxLength: {
                  value: 2000,
                  message: 'Violation details must be 2000 characters or less'
                },
                onBlur: () => methods.trigger('details')
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
                    required: {
                      value: true,
                      message: 'Stream / watershed is required'
                    },
                    onBlur: () => methods.trigger('streamWatershed')
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
                      required: {
                        value: methods.watch('streamWatershed') === 'Other' ? true : false,
                        message: 'Stream / Watershed is required'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Stream / Watershed must be 50 characters or less'
                      }
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
                        required: {
                          value: methods.watch('penaltyDate') ? true : false,
                          message: 'Penalty amount is required'
                        }
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
                        required: {
                          value: methods.watch('penaltyDate') ? true : false,
                          message: 'Penalty due date is required'
                        },
                        onBlur: () => methods.trigger('penaltyDate')
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
            <CancelBtn handleClick={resetState || (() => navigate('/'))} />
          </div>

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateSiteIllicitDischargeForm