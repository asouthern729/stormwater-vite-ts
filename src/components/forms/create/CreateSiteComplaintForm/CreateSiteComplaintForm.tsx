import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import MapContext from "../../../../context/Map/MapContext"
import { useCreateSiteComplaintForm, useHandleMapChange, handleCreateSiteComplaintFormSubmit } from "."
import styles from '../../Forms.module.css'

// Types
import { CreateSiteComplaintFormProps, Concern } from "./types"

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import CreateFollowUpForm from "../CreateFollowUpForm/CreateFollowUpForm"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateSiteComplaintForm({ site, date, resetState }: CreateSiteComplaintFormProps) {
  const { newSite } = useContext(MapContext)

  const methods = useCreateSiteComplaintForm(site, date)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Complaint</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(formData => handleCreateSiteComplaintFormSubmit(formData, site?.uuid || '', { invalidateQuery: queryClient.invalidateQueries(['getSite', site?.uuid]), resetState, navigate }))} className={styles.body}>

            {!site && ( // No associated site - show map
              <div className={styles.mapDiv}>
                <MapContainer
                  sites={[]}
                  type={'create'}
                  zoom={16} />
              </div>
            )}

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Complaint Date:'}
                  name={'date'}
                  required={true} />
                <input 
                  type="date"
                  className={styles.input}
                  { ...methods.register('date', {
                    required: {
                      value: true,
                      message: 'Complaint date is required'
                    },
                    onBlur: () => methods.trigger('date')
                  }) } />
              </div>
              <FormError field={'date'} />
            </div>

            <div className="flex gap-3 w-full flex-wrap">
              <div className="flex-1 flex flex-col">
                <div className="flex">
                  <FormLabel
                    label={'Concern:'}
                    name={'concern'}
                    required={true} />
                  <select 
                    className={styles.input}
                    { ...methods.register('concern', {
                      required: {
                        value: true,
                        message: 'Concern is required'
                      },
                      onBlur: () => methods.trigger('concern')
                    }) }>
                      <option value={''}></option>
                      {Object.values(Concern).map((concern) => (
                        <option key={concern} value={concern}>
                          {concern}
                        </option>
                      ))}
                  </select>
                </div>
                <FormError field={'concern'} />
              </div>

              {methods.watch('concern') === 'Other' && (
                <div className="flex-1 flex flex-col">
                  <div className="flex">
                    <FormLabel
                      label={'Other Concern:'}
                      name={'otherConcern'}
                      required={true} />
                    <input 
                      type="text"
                      className={styles.input}
                      { ...methods.register('otherConcern', {
                        required: {
                          value: true,
                          message: 'Other concern is required'
                        },
                        maxLength: {
                          value: 50,
                          message: 'Other concern must be 50 characters or less'
                        },
                        onBlur: () => methods.trigger('otherConcern'),
                        onChange: () => methods.trigger('otherConcern')
                      }) } />
                  </div>
                  <FormError field={'otherConcern'} />
                </div>
              )}

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
                      },
                      onChange: () => methods.trigger('responsibleParty')
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
                    required: {
                      value: true,
                      message: 'Complaint details is required'
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Complaint details must be 2000 characters or less'
                    },
                    onBlur: () => methods.trigger('details'),
                    onChange: () => methods.trigger('details')
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
                    },
                    onChange: () => methods.trigger('comments')
                  }) } />
              </div>
              <FormError field={'comments'} />
            </div>

            <div className="flex flex-col gap-3 py-10 w-full">
              <div className={styles.subtitle}>Complaintant</div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 w-full">
                  <div className={styles.inputSection}>
                    <div className="flex">
                      <FormLabel
                        label={'Full Name:'}
                        name={'name'} />
                      <input
                        type="text"
                        className={styles.input}
                        { ...methods.register('name', {
                          maxLength: {
                            value: 50,
                            message: 'Name must be 50 characters or less'
                          },
                          onChange: () => methods.trigger('name')
                        }) } />
                    </div>
                    <FormError field={'name'} />
                  </div>

                  <div className={styles.inputSection}>
                    <div className="flex">
                      <FormLabel
                        label={'Address:'}
                        name={'address'} />
                      <input
                        type="text"
                        className={styles.input}
                        { ...methods.register('address', {
                          maxLength: {
                            value: 100,
                            message: 'Address must be 100 characters or less'
                          },
                          onChange: () => methods.trigger('address')
                        }) } />
                    </div>
                    <FormError field={'address'} />
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <div className={styles.inputSection}>
                    <div className="flex">
                      <FormLabel
                        label={'Phone:'}
                        name={'phone'} />
                      <input
                        type="text"
                        className={styles.input}
                        { ...methods.register('phone', {
                          maxLength: {
                            value: 10,
                            message: 'Phone must be 10 characters or less'
                          },
                          onChange: () => methods.trigger('phone')
                        }) } />
                    </div>
                    <FormError field={'phone'} />
                  </div>    
                
                  <div className={styles.inputSection}>
                    <div className="flex">
                      <FormLabel
                        label={'Email:'}
                        name={'email'} />
                      <input
                        type="text"
                        className={styles.input}
                        { ...methods.register('email', {
                          maxLength: {
                            value: 50,
                            message: 'Email must be 50 characters or less'
                          },
                          onChange: () => methods.trigger('email')
                        }) } />
                    </div>
                    <FormError field={'email'} />
                  </div>

                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-10 w-full">
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

export default CreateSiteComplaintForm