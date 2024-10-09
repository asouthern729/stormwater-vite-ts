import { useContext } from "react"
import { useQueryClient } from "react-query"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../../context/App/AppContext"
import MapContext from "../../../../context/Map/MapContext"
import { useHandleMapChange } from "../../../../helpers"
import { useCreateSiteForm, handleCreateSiteFormSubmit } from "."
import styles from '../../Forms.module.css'

// Component
import MapContainer from "../../../map/MapContainer/MapContainer"
import FormLabel from "../../FormLabel/FormLabel"
import UpdateSiteContactsForm from "../../update/UpdateSiteContactsForm/UpdateSiteContactsForm"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateSiteForm() {
  const { inspectorOptions } = useContext(AppContext)
  const { newSite } = useContext(MapContext)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const methods = useCreateSiteForm()

  const { formState: { errors } } = methods

  useHandleMapChange(newSite, { setValue: methods.setValue })

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Site</div>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(formData => handleCreateSiteFormSubmit(formData, { invalidateQuery: queryClient.invalidateQueries('getSites'), navigate: navigate('/') }))} className={styles.body}>

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
                  required: {
                    value: true,
                    message: 'Site name is required'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Site name must be 100 characters or less'
                  }
                }) } />
            </div>
            {errors.name && (
              <div className={styles.error}>{errors.name.message}</div>
            )}
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
                  required: {
                    value: true,
                    message: 'Site location is required'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Site location must be 100 characters or less'
                  }
                }) } />
            </div>
            {errors.location && (
              <div className={styles.error}>{errors.location.message}</div>
            )}
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
                    required: {
                      value: true,
                      message: 'Precon date is required'
                    }
                  }) } />
              </div>
              {errors.preconDate && (
                <div className={styles.error}>{errors.preconDate.message}</div>
              )}
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
              {errors.permit && (
                <div className={styles.error}>{errors.permit.message}</div>
              )}
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
              {errors.cof && (
                <div className={styles.error}>{errors.cof.message}</div>
              )}
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
              {errors.tnq && (
                <div className={styles.error}>{errors.tnq.message}</div>
              )}
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

          <UpdateSiteContactsForm />

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