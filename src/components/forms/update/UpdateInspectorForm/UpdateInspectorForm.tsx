import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { FormProvider } from 'react-hook-form'
import { handleUpdateInspectorFormSubmit } from './utils'
import { useUpdateInspectorForm } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { UpdateInspectorFormProps } from './types'

// Components
import { NameInput, EmailInput, Buttons } from '../../create/CreateInspectorForm/components'

function UpdateInspectorForm({ inspector, handleCloseForm }: UpdateInspectorFormProps) {
  const methods = useUpdateInspectorForm(inspector)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Update Inspector</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateInspectorFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getInspectors'), navigate: () => navigate('/') }))} className={styles.body}>

          <NameInput />
          <EmailInput />
          
          <Buttons handleCloseForm={handleCloseForm} />

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateInspectorForm