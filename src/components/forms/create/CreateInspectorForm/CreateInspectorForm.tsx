import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { FormProvider } from 'react-hook-form'
import { useCreateInspectorForm, handleCreateInspectorFormSubmit, handleRequiredFieldValidation } from '.'
import styles from '../../Forms.module.css'

// Components
import FormLabel from '../../FormLabel/FormLabel'
import FormError from '../../FormError/FormError'
import SaveBtn from '../../../buttons/forms/SaveBtn/SaveBtn'
import CancelBtn from '../../../buttons/forms/CancelBtn/CancelBtn'

function CreateInspectorForm() {
  const methods = useCreateInspectorForm()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Inspector</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleCreateInspectorFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getInspectors'), navigate: () => navigate('/') }))} className={styles.body}>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Inspector Name:'}
                name={'name'}
                required={true} />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register('name', {
                  required: 'Inspector name is required',
                  maxLength: {
                    value: 50,
                    message: 'Site name must be 50 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'name'} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Inspector Email:'}
                name={'email'}
                required={true} />
              <input 
                type="email"
                className={styles.input}
                { ...methods.register('email', {
                  required: 'Inspector email is required',
                  maxLength: {
                    value: 50,
                    message: 'Inspector email must be 50 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('email', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'email'} />
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

export default CreateInspectorForm