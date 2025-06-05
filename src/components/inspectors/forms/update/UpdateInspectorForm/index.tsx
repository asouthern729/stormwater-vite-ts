import { FormProvider } from 'react-hook-form'
import { useUpdateInspectorForm, useHandleFormSubmit } from './hooks'
import { useOnCancelBtnClick } from '@/components/enforcement/forms/create/CreateViolationForm/hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import { NameInput, EmailInput } from '../../create/CreateInspectorForm/components'

function UpdateInspectorForm({ inspector }: { inspector: AppTypes.InspectorInterface }) {
  const methods = useUpdateInspectorForm(inspector)

  const onCancelBtnClick = useOnCancelBtnClick()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Inspector</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className={styles.body}>

          <NameInput />
          <EmailInput />
          
          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateInspectorForm