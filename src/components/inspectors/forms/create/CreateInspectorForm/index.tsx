import { FormProvider } from 'react-hook-form'
import { useCreateInspectorForm, useHandleFormSubmit } from './hooks'
import { useOnCancelBtnClick } from '@/components/enforcement/forms/create/CreateViolationForm/hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormBtns from '@/components/form-elements/buttons/FormBtns'
import * as Components from './components'

function CreateInspectorForm() {
  const methods = useCreateInspectorForm()

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Inspector</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
          
          <Components.NameInput />
          <Components.EmailInput />
          
          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateInspectorForm