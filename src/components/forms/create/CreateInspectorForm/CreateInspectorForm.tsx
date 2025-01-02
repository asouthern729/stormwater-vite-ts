import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateInspectorForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Components
import { NameInput, EmailInput, Buttons } from './components'

function CreateInspectorForm() {
  const navigate = useNavigate()

  const methods = useCreateInspectorForm()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Create Inspector</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
          <NameInput />
          <EmailInput />
          
          <Buttons handleCloseForm={() => navigate('/')} />
        </form>
      </FormProvider>

    </div>
  )
}

export default CreateInspectorForm