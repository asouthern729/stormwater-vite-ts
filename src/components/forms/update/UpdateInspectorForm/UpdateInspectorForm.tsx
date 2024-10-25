import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { FormProvider } from 'react-hook-form'
import { useUpdateInspectorForm, handleUpdateInspectorFormSubmit, handleRequiredFieldValidation } from '.'
import styles from '../../Forms.module.css'

// Types
import { UpdateInspectorFormProps } from './types'

// Components
import FormLabel from '../../FormLabel/FormLabel'
import FormError from '../../FormError/FormError'
import SaveBtn from '../../../buttons/forms/SaveBtn/SaveBtn'
import CancelBtn from '../../../buttons/forms/CancelBtn/CancelBtn'

function UpdateInspectorForm({ inspector, resetState }: UpdateInspectorFormProps) {
  const methods = useUpdateInspectorForm(inspector)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Update Inspector</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateInspectorFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getInspectors'), navigate: () => navigate('/') }))} className={styles.body}>

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
                    message: 'Inspector name must be 50 characters or less'
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
            <CancelBtn handleClick={resetState} />
          </div>

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateInspectorForm