import { useContext } from "react"
import { useQueryClient } from "react-query"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../../context/App/AppContext"
import MapContext from "../../../../context/Map/MapContext"
import { useHandleMapChange } from "../../../../helpers"
import { useCreateSiteForm, handleCreateSiteFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Components
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import UpdateSiteContactsForm from "../../update/UpdateSiteContactsForm/UpdateSiteContactsForm"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateSiteForm() {
  const { inspectorOptions } = useContext(AppContext)
  const { newSite } = useContext(MapContext)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const methods = useCreateSiteForm()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  return (
    <div data-testid="create-site-form" className={styles.container}>

      <div className={styles.title}>Create Site</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(formData => handleCreateSiteFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getSites'), navigate: () => navigate('/') }))} className={styles.body}>

          <div className={styles.mapDiv}>
            <MapContainer
              sites={[]}
              type={'create'}
              zoom={16} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Site Name:'}
                name={'name'}
                required={true} />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register('name', {
                  required: 'Site name is required',
                  maxLength: {
                    value: 100,
                    message: 'Site name must be 100 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'name'} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Location:'}
                name={'location'}
                required={true} />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register('location', {
                  required: 'Site location is required',
                  maxLength: {
                    value: 100,
                    message: 'Site location must be 100 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('location', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'location'} />
          </div>

          <section className="flex gap-2 w-full">
            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Precon Date:'}
                  name={'preconDate'}
                  required={true} />
                <input 
                  type="date"
                  className={styles.input}
                  { ...methods.register('preconDate', {
                    required: 'Precon date is required',
                    onBlur: () => handleRequiredFieldValidation('preconDate', { watch: methods.watch, trigger: methods.trigger })
                  }) } />
              </div>
              <FormError field={'preconDate'} />
            </div>

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Green Infrastructure:'}
                  name={'greenInfrastructure'} />
                <select 
                  className={styles.input}
                  { ...methods.register('greenInfrastructure') }>
                    <option value=""></option>
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
              </div>
            </div>
          </section>

          <section className="flex gap-2 w-full">
            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Permit #:'}
                  name={'permit'} />
                <input 
                  type="text"
                  className={styles.input}
                  { ...methods.register('permit', {
                    maxLength: {
                      value: 20,
                      message: 'Permit must be 20 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'permit'} />
            </div>

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'COF #:'}
                  name={'cof'} />
                <input 
                  type="text"
                  className={styles.input}
                  { ...methods.register('cof', {
                    maxLength: {
                      value: 10,
                      message: 'COF # must be 10 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'cof'} />
            </div>

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'TNQ #:'}
                  name={'tnq'} />
                <input 
                  type="text"
                  className={styles.input}
                  { ...methods.register('tnq', {
                    maxLength: {
                      value: 20,
                      message: 'TNQ # must be 20 characters or less'
                    }
                  }) } />
              </div>
              <FormError field={'tnq'} />
            </div>
          </section>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Inspector:'}
                name={'inspectorId'} />
              <select 
                className={styles.input}
                { ...methods.register('inspectorId') }>
                <option value=""></option>
                {inspectorOptions.map(inspector => {
                  return (
                    <option key={`inspector-option-${ inspector.value }`} value={inspector.value}>{inspector.text}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="py-10">
            <UpdateSiteContactsForm />
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

export default CreateSiteForm